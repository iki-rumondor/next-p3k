import { createContext, useContext, useState } from "react";

interface ContextType {
  reload: boolean;
  setReload: (newState: boolean) => void;
}

const ReloadContext = createContext<ContextType | undefined>(undefined);

export const ReloadProvider = ({ children }: { children: React.ReactNode }) => {
  const [reload, setReload] = useState<boolean>(false);

  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
      {children}
    </ReloadContext.Provider>
  );
};

export const useReload = () => {
  const context = useContext(ReloadContext);
  if (!context) {
    throw new Error("useReload must be used within a ReloadProvider");
  }
  return context;
};
