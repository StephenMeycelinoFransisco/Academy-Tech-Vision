const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen flex items-center justify-center">
      {children}
    </section>
  );
};

export default AuthLayout;
