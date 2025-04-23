import Header from "@/components/Header";
import GridCanvas from "@/components/GridCanvas";
import SharedUserBubble from "@/components/SharedUserBubble";
import useBubbleStore from "@/store/bubbleStore";

const Index = () => {
  const { sharedUsers } = useBubbleStore();
  
  const getRandomPosition = (index: number) => {
    return {
      x: 100 + (index * 70) % 500,
      y: 100 + Math.floor(index / 5) * 70,
    };
  };
  
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Header />
      <GridCanvas />
      
      <div className="absolute top-16 left-0 right-0 bottom-0 pointer-events-none">
        {sharedUsers.map((user, index) => (
          <SharedUserBubble 
            key={user.email} 
            user={user} 
            position={getRandomPosition(index)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
