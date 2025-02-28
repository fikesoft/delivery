import logoIcon from '../../assets/img/image 1.svg'
const Logo = () => {
  return (
    <div className='logo-container'>
        <img src={logoIcon} alt='LOGO'/>
        <div className='text'>
            <h1 className='title'>REACT PIZZA</h1>
            <p className='subtitle'>Самая вкусная пицца во вселенной</p>
        </div>
    </div>
  )
}

export default Logo