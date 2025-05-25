import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text, Button } from '@react-email/components';

interface BookingEmailProps {
  bookingId: number;
  bookingLink: string;
  translations: (key: string) => string;
}

export const BookingEmail = ({ bookingId, bookingLink, translations: t }: BookingEmailProps) => {
  const title = t("title");
  const description = t("description");
  const buttonText = t("buttonText");

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{title}</Heading>

          <Section style={section}>
            <Text style={text}>{description}</Text>
            <Text style={text}>Booking ID: {bookingId}</Text>
            <Button style={button} href={bookingLink}>
              {buttonText}
            </Button>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>Best regards, Karim Tour</Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const heading = {
  fontSize: '24px',
  lineHeight: '1.5',
  fontWeight: '600',
  color: '#333',
};

const section = {
  padding: '24px',
  border: '1px solid #eaeaea',
  borderRadius: '8px',
  marginTop: '20px',
};

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#333',
};

const button = {
  backgroundColor: '#007BFF',
  color: '#fff',
  padding: '12px 20px',
  borderRadius: '4px',
  display: 'inline-block',
  textDecoration: 'none',
  marginTop: '16px',
};

const hr = {
  borderColor: '#eaeaea',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};