// services/googleSheet.ts

export const sendToGoogleSheet = async (data: { email: string; role: string; feedback: string }) => {
    const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;

    if (!APPS_SCRIPT_URL) {
        console.error("Error: URL de Google Script no configurada.");
        return false;
    }

    try {
        const formData = new URLSearchParams();
        formData.append('email', data.email);
        formData.append('role', data.role);
        formData.append('feedback', data.feedback);

        // Usamos no-cors para evitar problemas de seguridad del navegador
        await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData,
        });
        
        return true;
    } catch (error) {
        console.error("Error de red en el servicio:", error);
        return false;
    }
};