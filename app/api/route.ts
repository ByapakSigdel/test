import axios from 'axios';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ message: 'Only POST requests allowed' }),
      { status: 405 }
    );
  }

  const data = await req.json();
  const { token } = data;
  const secretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY; // Ensure the correct variable is used

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set in environment variables');
    return new Response(JSON.stringify({ message: 'RECAPTCHA secret key not set' }), { status: 500 });
  }

  if (!token) {
    return new Response(JSON.stringify({ message: 'Token missing' }), { status: 400 });
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const { data } = await axios.post(verificationURL);
    if (data.success) {
      return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Failed', ...data }), { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return new Response(JSON.stringify({ message: 'Error verifying reCAPTCHA' }), { status: 500 });
  }
}
