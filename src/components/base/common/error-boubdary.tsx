import { type ReactNode, useState } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Link, useRouteError } from 'react-router-dom';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { Button, toast } from '@onaeko/ui';
import { RouteURL } from '@/routes/paths';
import { NODE_ENV, NodeEnv } from '@/utils/enums.util';

interface ErrorInfo {
    componentStack?: string | null;
}

const generateErrorId = () =>
    `err_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

const logError = (
    error: Error,
    info?: ErrorInfo,
    metadata?: Record<string, unknown>,
) => {
    const errorId = generateErrorId();
    if (NODE_ENV !== NodeEnv.PRODUCTION) {
        console.error('[ErrorBoundary]', {
            error,
            componentStack: info?.componentStack,
            errorId,
            ...metadata,
        });
    }
    return errorId;
};

interface ErrorFallbackProps {
    error: Error | null;
    errorId: string;
    resetError: () => void;
}

export const ErrorFallback = ({
    error,
    errorId,
    resetError,
}: ErrorFallbackProps) => {
    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center gap-4 p-6 text-center"
            role="alert"
        >
            <AlertCircle className="size-12 text-destructive" />
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="text-muted-foreground max-w-md">
                {error?.message || 'An unexpected error occurred.'}
            </p>
            {errorId ? (
                <button
                    type="button"
                    className="text-sm text-muted-foreground underline"
                    onClick={() => {
                        void navigator.clipboard.writeText(errorId);
                        toast.success('Error ID copied');
                    }}
                >
                    Error ID: {errorId}
                </button>
            ) : null}
            <div className="flex gap-3">
                <Button
                    onClick={() => {
                        resetError();
                        window.location.reload();
                    }}
                    variant="outline"
                    iconBefore={<RefreshCw className="size-4" />}
                >
                    Try again
                </Button>
                <Button asChild iconBefore={<Home className="size-4" />}>
                    <Link to={RouteURL.onboarding}>Back to onboarding</Link>
                </Button>
            </div>
        </div>
    );
};

export function RouterErrorElement() {
    const error = useRouteError();
    const normalized =
        error instanceof Error ? error : new Error(String(error));
    const errorId = logError(normalized);
    return (
        <ErrorFallback
            error={normalized}
            errorId={errorId}
            resetError={() => {
                window.location.href = RouteURL.onboarding;
            }}
        />
    );
}

export function AppErrorBoundary({ children }: { children: ReactNode }) {
    const [errorId, setErrorId] = useState('');

    return (
        <ReactErrorBoundary
            FallbackComponent={({ error, resetErrorBoundary }) => (
                <ErrorFallback
                    error={
                        error instanceof Error
                            ? error
                            : new Error(String(error))
                    }
                    errorId={errorId}
                    resetError={resetErrorBoundary}
                />
            )}
            onReset={() => setErrorId('')}
            onError={(error, info) => {
                setErrorId(
                    logError(
                        error instanceof Error
                            ? error
                            : new Error(String(error)),
                        info,
                    ),
                );
            }}
        >
            {children}
        </ReactErrorBoundary>
    );
}

export default AppErrorBoundary;
