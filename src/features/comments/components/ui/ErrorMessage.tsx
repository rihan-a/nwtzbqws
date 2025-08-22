interface ErrorMessageProps {
    message: string;
}

export function ErrorMessage({message}: ErrorMessageProps) {
    return (
        <div className="text-center py-8 text-sm lg:text-base text-red-600">
            {message}
        </div>
    );
}

export default ErrorMessage;
