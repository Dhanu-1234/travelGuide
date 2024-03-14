import {Component} from 'react'
import Loader from 'react-loader-spinner'
import PackageItem from './components/PackageItem'
import './App.css'

const resultStatusContants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class App extends Component {
  state = {packagesList: [], resultStatus: resultStatusContants.initial}

  componentDidMount() {
    this.getPackages()
  }

  getPackages = async () => {
    this.setState({resultStatus: resultStatusContants.loading})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {packages} = data
      const updatedPackageData = packages.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.name,
        imageUrl: eachObj.image_url,
        description: eachObj.description,
      }))

      this.setState({
        packagesList: updatedPackageData,
        resultStatus: resultStatusContants.success,
      })
    } else {
      console.log('failed to fetch')
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {packagesList} = this.state

    return (
      <ul className="packages-list">
        {packagesList.map(eachObj => (
          <PackageItem key={eachObj.id} packageDetails={eachObj} />
        ))}
      </ul>
    )
  }

  getResults = () => {
    const {resultStatus} = this.state
    let result
    switch (resultStatus) {
      case resultStatusContants.loading:
        result = this.renderLoadingView()
        break
      case resultStatusContants.success:
        result = this.renderSuccessView()
        break
      default:
        result = null
        break
    }
    return result
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        {this.getResults()}
      </div>
    )
  }
}

export default App
