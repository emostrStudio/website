import { Frame } from '@/components/frame';
import { OnlineHeading } from '@/components/online-switch';

export function OnlineSection() {
  return (
    <Frame labelledBy="online-title">
      <div className="reveal px-5 py-20 text-center sm:px-8 sm:py-28 lg:px-10">
        <OnlineHeading />
        <p className="mt-5 text-lg text-muted-foreground">Мы готовы, когда готовы вы</p>
      </div>
    </Frame>
  );
}
