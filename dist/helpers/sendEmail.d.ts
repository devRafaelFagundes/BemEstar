export function sendEmail(targetEmail: any, htmlMessageString: any, text: any): Promise<{
    success: boolean;
    message: any;
    previewUrl: any;
} | {
    success: boolean;
    message: unknown;
    previewUrl?: never;
}>;
export function formEmailMessage(title: any, message: any, link: any): string;
//# sourceMappingURL=sendEmail.d.ts.map