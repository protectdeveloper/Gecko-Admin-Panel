export default function ErrorView({ error }: { error: any }) {
  const errorMessage = error?.data?.message || error?.message || 'Error occurred';

  return (
    <div className="w-full h-[75vh] p-5 border border-border rounded-lg flex justify-center items-center gap-2">
      {/*  <LottieView
        autoPlay
        loop
        style={{ height: 250 }}
        webStyle={{ width: 600, height: 180, marginBottom: 20 }}
        source={require('@/assets/animations/error.json')}
      /> */}
      <span className="text-foreground text-lg font-medium">Hata</span>
      <span className="text-muted-foreground text-xs">{errorMessage}</span>
      <span className="text-muted-foreground text-xs">{JSON.stringify(error?.response?.data)}</span>
    </div>
  );
}
