import ReactDOM from 'react-dom/client'
import App from './App'

const numbers = [
  {
    id: 1,
    name: 'Ms. Masoosoobooboobear',
    number: 9811111111,
  },
  {
    id: 2, 
    name: 'Abhishrent Khatri',
    number: 9700000000
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App numbers={numbers} />
)
