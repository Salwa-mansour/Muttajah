const style = {
  footer: {
    height: '300px',
    position: 'relative',
    width: '100%',
    padding: '2rem 10%',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
  }
}

function Footer() {
  return (
    <footer className="footer" style={style.footer}>
      <p>footer place holder</p>
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  )
}

export default Footer