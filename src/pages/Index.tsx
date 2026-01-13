const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center max-w-md p-8">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Ready to Build!
        </h1>
        <p className="text-slate-600 mb-6">
          Your project is set up and ready. Tell the AI what you want to create and watch the magic happen.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>AI is ready</span>
        </div>
      </div>
    </div>
  );
};

export default Index;