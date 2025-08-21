import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Check, Mail } from 'lucide-react';

const premiumFeatures = [
  'Priority placement for your food listings.',
  'Detailed analytics on your environmental impact.',
  'Prominent branding as a "WasteNoFood Hero".',
  'Assistance with tax-deductible documentation.',
];

export default function SponsorshipPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Award className="w-8 h-8" />
          </div>
          <CardTitle className="font-headline text-3xl text-primary">Partner with Us & Amplify Your Impact</CardTitle>
          <CardDescription className="max-w-2xl mx-auto pt-2">
            Join our premium program to gain enhanced visibility, receive detailed impact reports, and showcase your commitment to fighting food waste.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-md mx-auto">
            <ul className="space-y-3">
                {premiumFeatures.map((feature) => (
                    <li key={feature} className="flex items-start">
                        <div className="rounded-full bg-accent text-accent-foreground p-1 mr-3">
                           <Check className="h-4 w-4" />
                        </div>
                        <span className="flex-1">{feature}</span>
                    </li>
                ))}
            </ul>
             <Button size="lg" className="w-full mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us to Become a Partner
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
