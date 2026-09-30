import { useEffect } from 'react';

const KEEP_ALIVE_INTERVAL = 12 * 60 * 1000; // 12 minutes

const BACKEND_HEALTH_URL = 'https://api.dhritex.com/actuator/health';

function BackendKeepAlive() {
    useEffect(() => {
        const pingBackend = async () => {
            try {
                await fetch(BACKEND_HEALTH_URL, {
                    method: 'GET',
                    cache: 'no-store',
                });

                console.log('[KeepAlive] Backend health check completed.');
            } catch (error) {
                console.warn(
                    '[KeepAlive] Backend health check failed:',
                    error
                );
            }
        };

        // Ping once when the website loads.
        pingBackend();

        // Then ping every 12 minutes.
        const intervalId = setInterval(
            pingBackend,
            KEEP_ALIVE_INTERVAL
        );

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return null;
}

export default BackendKeepAlive;