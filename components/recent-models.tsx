import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentModels() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>NN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Neural Network v2</p>
          <p className="text-sm text-muted-foreground">Training completed - 92% accuracy</p>
        </div>
        <div className="ml-auto font-medium">+4.3%</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>CV</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Computer Vision Model</p>
          <p className="text-sm text-muted-foreground">Training in progress - Epoch 45/100</p>
        </div>
        <div className="ml-auto font-medium">+2.1%</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>NL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">NLP Transformer</p>
          <p className="text-sm text-muted-foreground">Training completed - 88% accuracy</p>
        </div>
        <div className="ml-auto font-medium">+2.7%</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarFallback>RL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">RL Agent</p>
          <p className="text-sm text-muted-foreground">Training paused - 67% progress</p>
        </div>
        <div className="ml-auto font-medium">+1.8%</div>
      </div>
    </div>
  )
}

