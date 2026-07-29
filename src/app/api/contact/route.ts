import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(1, "Please select a subject"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = contactSchema.parse(body);

        return NextResponse.json(
            {
                success: true,
                message: "Your message has been sent successfully. We'll get back to you within 24 hours.",
                data: validatedData,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation failed",
                    errors: error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        console.error("Contact form error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong. Please try again or call us directly.",
            },
            { status: 500 }
        );
    }
}
