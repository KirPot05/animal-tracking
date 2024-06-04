export function failed_response(message: string, content: unknown = {}) {
  return {
    success: false,
    content,
    message,
  };
}

export function success_response(message: string, content: unknown = {}) {
  return {
    success: true,
    content,
    message,
  };
}
