
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share, Download, FileText, FileImage, Copy, Plus, X, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBubbleStore from "@/store/bubbleStore";

export default function Header() {
  const { toast } = useToast();
  const { sharedUsers, addSharedUser, removeSharedUser } = useBubbleStore();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  
  const handleShare = () => {
    // In a real app, generate a shareable link
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        toast({
          title: "Link copied!",
          description: "Share this link with others to view your board.",
        });
      },
      () => {
        toast({
          title: "Failed to copy link",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    );
  };

  const handleExport = (format: string) => {
    // In a real app, this would generate the appropriate export
    toast({
      title: `Exporting as ${format}...`,
      description: "This feature will be implemented with actual backend integration.",
    });
  };
  
  const handleAddUser = () => {
    if (email && /^\S+@\S+\.\S+$/.test(email)) {
      addSharedUser(email);
      setEmail('');
      
      toast({
        title: "User invited",
        description: `An invitation has been sent to ${email}`,
      });
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-50 flex items-center px-4 justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-tight text-perplexity-purple">
          PerplexiGrid
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setIsShareDialogOpen(true)}
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">{sharedUsers.length} Users</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Share Options</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleShare}>
              <Copy className="mr-2 h-4 w-4" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsShareDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Invite users
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Export As</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleExport("PNG")}>
              <FileImage className="mr-2 h-4 w-4" />
              PNG Image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("PDF")}>
              <FileText className="mr-2 h-4 w-4" />
              PDF Document
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("JSON")}>
              <Download className="mr-2 h-4 w-4" />
              JSON Data
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
      
      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Board</DialogTitle>
            <DialogDescription>
              Invite others to view and collaborate on this board.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter an email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleAddUser} type="submit">
              Invite
            </Button>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Shared with:</h4>
            {sharedUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No users yet. Invite someone!</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {sharedUsers.map((user) => (
                  <div key={user.email} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                    <span className="text-sm">{user.email}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => removeSharedUser(user.email)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button
              variant="secondary"
              onClick={handleShare}
              className="sm:w-auto"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
