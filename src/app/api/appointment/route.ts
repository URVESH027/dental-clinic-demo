import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  message: z.string().optional(),
});

// In-memory storage for appointments (replace with database in production)
const appointments: Array<{ id: string; data: z.infer<typeof appointmentSchema>; createdAt: Date }> = [];

function generateId(): string {
  return `APT-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

async function sendConfirmationEmail(data: z.infer<typeof appointmentSchema>, id: string) {
  // In production, integrate with SendGrid, Resend, or Nodemailer
  // This is a simulation that logs the email content
  const emailContent = {
    to: data.email,
    from: "appointments@thousandsmiledental.com",
    subject: "Appointment Request Received - Thousand Smile Dental Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #c8a951;">Thank You, ${data.name}!</h2>
        <p>We've received your appointment request and will contact you within 15 minutes during business hours.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Reference:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${id}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.service}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.preferredDate}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.preferredTime}</td></tr>
        </table>
        <p>For immediate assistance, call us at <a href="tel:+15551234567" style="color: #c8a951;">(555) 123-4567</a></p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666;">Thousand Smile Dental Clinic | 12345 Smile Boulevard, Suite 100, Los Angeles, CA 90025</p>
      </div>
    `,
  };
}

async function sendStaffNotification(data: z.infer<typeof appointmentSchema>, id: string) {
  const notification = {
    to: "appointments@thousandsmiledental.com",
    from: "system@thousandsmiledental.com",
    subject: `NEW APPOINTMENT REQUEST: ${data.name} - ${data.service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #102a43;">New Appointment Request</h2>
        <p><strong>Reference ID:</strong> ${id}</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Patient:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.service}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.preferredDate}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.preferredTime}</td></tr>
          ${data.message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Notes:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.message}</td></tr>` : ""}
        </table>
        <p><strong>Action Required:</strong> Please contact patient within 15 minutes to confirm this appointment.</p>
      </div>
    `,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = appointmentSchema.parse(body);

    // Generate unique reference ID
    const id = generateId();

    // Store appointment in memory
    appointments.push({ id, data: validatedData, createdAt: new Date() });

    // Send email notifications in parallel
    await Promise.all([
      sendConfirmationEmail(validatedData, id),
      sendStaffNotification(validatedData, id),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Appointment requested successfully. We'll contact you within 15 minutes to confirm.",
        referenceId: id,
        data: validatedData
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    console.error("[APPOINTMENT] Error processing request:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again or call us directly."
      },
      { status: 500 }
    );
  }
}
