
import { Cog, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 glass-card mb-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Monitor className="h-6 w-6 text-gpuwizard-accent" />
        <h1 className="text-xl font-bold">GPU Wizard Monitor</h1>
        <span className="bg-gpuwizard-accent/20 text-gpuwizard-accent px-2 py-0.5 rounded-full text-xs ml-2">
          BETA
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gpuwizard-accent/30 bg-transparent hover:bg-gpuwizard-accent/10"
        >
          <Cog className="h-4 w-4 mr-2" /> Settings
        </Button>
      </div>
    </header>
  );
};

export default Header;
