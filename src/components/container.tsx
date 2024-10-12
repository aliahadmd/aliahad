function Container({children}:{children:React.ReactNode}) {
  return (
    <div className="max-w-[1100px] mx-auto min-h-screen flex flex-col border-l border-r dark:border-gray-700 bg-background text-foreground">
      {children}
    </div>
  );
}

export default Container
