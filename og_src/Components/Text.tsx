export const Text: React.FC<{ text: string, size: 'lg' | 'sm' }> = ({ text, size }) => {
  return (
    <div style={{ color: "white", fontSize: size === 'lg' ? '2rem' : '1rem', textAlign: "center" }}>
      {text}
    </div>
  )
}