import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Video, VideoOff, Loader } from 'lucide-react';

export interface HeyGenAvatarHandle {
  speak: (text: string) => Promise<void>;
}

export interface AvatarConfig {
  avatarId: string;
  voiceId: string;
}

// Only these two prototypes get a live avatar for the demo
export const PROTOTYPE_AVATAR_MAP: Record<string, AvatarConfig> = {
  'proto-nursing': {
    avatarId: 'Judy_Doctor_Standing2_public',
    voiceId: '7ffb69e578d4492587493c26ebcabc31',
  },
  'proto-education': {
    avatarId: 'Judy_Teacher_Standing_public',
    voiceId: '7ffb69e578d4492587493c26ebcabc31',
  },
};

// Returns null if this prototype doesn't have an avatar
export function resolveAvatar(prototypeId: string): AvatarConfig | null {
  return PROTOTYPE_AVATAR_MAP[prototypeId] ?? null;
}

interface HeyGenAvatarProps {
  avatarId?: string;
  voiceId?: string;
  onReady?: () => void;
  onError?: (msg: string) => void;
}

type Status = 'idle' | 'connecting' | 'ready' | 'error';

const DEFAULT_AVATAR = 'Judy_Doctor_Standing2_public';
const DEFAULT_VOICE = '7ffb69e578d4492587493c26ebcabc31';

async function heygenCall(action: string, payload: object) {
  const res = await fetch('/api/heygen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload }),
  });
  if (!res.ok) throw new Error(`HeyGen ${action} failed: ${res.status}`);
  return res.json();
}

const HeyGenAvatar = forwardRef<HeyGenAvatarHandle, HeyGenAvatarProps>(
  ({ avatarId = DEFAULT_AVATAR, voiceId = DEFAULT_VOICE, onReady, onError }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const sessionIdRef = useRef<string | null>(null);
    const [status, setStatus] = useState<Status>('idle');
    const [enabled, setEnabled] = useState(false);

    useImperativeHandle(ref, () => ({
      speak: async (text: string) => {
        if (!sessionIdRef.current || status !== 'ready') return;
        try {
          await heygenCall('task', {
            session_id: sessionIdRef.current,
            text,
            task_type: 'repeat',
          });
        } catch {
          // non-fatal — audio still plays via browser TTS if configured
        }
      },
    }));

    const connect = async () => {
      setStatus('connecting');
      try {
        // 1. Create streaming session
        const newRes = await heygenCall('new', {
          quality: 'medium',
          avatar_name: avatarId,
          voice: { voice_id: voiceId },
        });

        const { session_id, sdp: offerSdp, ice_servers } = newRes.data;
        sessionIdRef.current = session_id;

        // 2. Set up WebRTC peer connection
        const pc = new RTCPeerConnection({ iceServers: ice_servers });
        pcRef.current = pc;

        // Show video when track arrives
        pc.ontrack = (event) => {
          if (videoRef.current && event.streams[0]) {
            videoRef.current.srcObject = event.streams[0];
          }
        };

        // Forward ICE candidates to HeyGen
        pc.onicecandidate = async ({ candidate }) => {
          if (candidate && session_id) {
            await heygenCall('ice', {
              session_id,
              candidate: candidate.toJSON(),
            }).catch(() => {});
          }
        };

        // 3. Set remote description (HeyGen's offer)
        await pc.setRemoteDescription(new RTCSessionDescription(offerSdp));

        // 4. Create and set local answer
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        // 5. Send our answer to HeyGen
        await heygenCall('start', {
          session_id,
          sdp: answer,
        });

        setStatus('ready');
        onReady?.();
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Avatar connection failed';
        setStatus('error');
        onError?.(msg);
      }
    };

    const disconnect = async () => {
      if (sessionIdRef.current) {
        await heygenCall('stop', { session_id: sessionIdRef.current }).catch(() => {});
        sessionIdRef.current = null;
      }
      pcRef.current?.close();
      pcRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
      setStatus('idle');
    };

    const toggle = async () => {
      if (enabled) {
        setEnabled(false);
        await disconnect();
      } else {
        setEnabled(true);
        await connect();
      }
    };

    // Clean up on unmount
    useEffect(() => {
      return () => { disconnect(); };
    }, []);

    return (
      <div className="relative">
        {/* Avatar video panel */}
        {enabled && (
          <div className="relative bg-black rounded-t-xl overflow-hidden" style={{ height: 220 }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {status === 'connecting' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                <Loader size={24} className="text-gcu-gold animate-spin mb-2" />
                <p className="text-white/70 text-xs">Connecting avatar…</p>
              </div>
            )}
            {status === 'error' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                <p className="text-red-400 text-xs text-center px-4">Avatar unavailable — using voice only</p>
              </div>
            )}
            {/* Live badge */}
            {status === 'ready' && (
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-[10px] font-semibold uppercase tracking-wider">Live</span>
              </div>
            )}
          </div>
        )}

        {/* Toggle button — rendered inline (parent puts it in the header) */}
        <button
          onClick={toggle}
          className={`p-1.5 rounded-lg transition-colors ${
            enabled
              ? 'text-gcu-purple bg-gcu-purple/10'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
          title={enabled ? 'Hide avatar' : 'Show live avatar'}
        >
          {enabled ? <Video size={14} /> : <VideoOff size={14} />}
        </button>
      </div>
    );
  }
);

HeyGenAvatar.displayName = 'HeyGenAvatar';
export default HeyGenAvatar;
