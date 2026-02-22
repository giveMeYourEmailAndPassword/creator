export default function Container({ children, pt = 'pt-40' }: { children: React.ReactNode; pt?: string }) {
  return (
    <div className={`max-w-7xl 2xl:max-w-350 mx-auto px-6 ${pt}`}>
      {children}
    </div>
  )
}
