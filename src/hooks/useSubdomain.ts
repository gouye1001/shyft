/**
 * useSubdomain - Detects which subdomain the app is running on
 * 
 * Returns:
 * - 'app' for app.shyft.io or app.localhost
 * - 'www' for shyft.io or localhost (marketing)
 */
export function useSubdomain(): 'app' | 'www' {
    const hostname = window.location.hostname;

    // Check for app subdomain
    // Handles: app.shyft.io, app.localhost, app.shyft.local, etc.
    if (hostname.startsWith('app.')) {
        return 'app';
    }

    // Default to marketing (www)
    return 'www';
}

/**
 * Get the base URL for app subdomain
 * Used for redirecting after login
 */
export function getAppUrl(): string {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;

    // Already on app subdomain
    if (hostname.startsWith('app.')) {
        return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
    }

    // Construct app subdomain URL
    // localhost -> app.localhost
    // shyft.io -> app.shyft.io
    const appHost = hostname === 'localhost'
        ? 'app.localhost'
        : `app.${hostname}`;

    return `${protocol}//${appHost}${port ? `:${port}` : ''}`;
}

/**
 * Get the base URL for marketing site
 * Used for redirecting after logout
 */
export function getMarketingUrl(): string {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;

    // Remove app. prefix if present
    const marketingHost = hostname.startsWith('app.')
        ? hostname.replace('app.', '')
        : hostname;

    return `${protocol}//${marketingHost}${port ? `:${port}` : ''}`;
}

/**
 * Get the app URL with auth tokens appended for cross-subdomain transfer
 * This transfers the auth tokens via URL so the app subdomain can capture them
 */
export function getAppUrlWithAuth(): string {
    const baseUrl = getAppUrl();
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken && refreshToken) {
        const params = new URLSearchParams({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
        return `${baseUrl}?${params.toString()}`;
    }

    return baseUrl;
}

export default useSubdomain;
