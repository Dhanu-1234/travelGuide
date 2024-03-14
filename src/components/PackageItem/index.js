import './index.css'

const PackageItem = props => {
  const {packageDetails} = props
  const {name, imageUrl, description} = packageDetails

  return (
    <li className="package-item">
      <img src={imageUrl} alt={name} className="img-styles" />
      <h2 className="package-title">{name}</h2>
      <p className="package-description">{description}</p>
    </li>
  )
}

export default PackageItem
