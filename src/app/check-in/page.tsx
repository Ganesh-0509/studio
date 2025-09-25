import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Video } from 'lucide-react';

export default function CheckInPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">QR Code Check-in</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Scan Attendee QR Code</CardTitle>
          <CardDescription>
            Position the attendee's QR code within the frame to check them in and award points.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center border-2 border-dashed">
             <Video className="h-24 w-24 text-muted-foreground" />
             <p className="text-muted-foreground mt-4">Camera view will appear here</p>
          </div>
          <Button className="w-full" size="lg">
            <QrCode className="mr-2 h-5 w-5" />
            Start Scanning
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
