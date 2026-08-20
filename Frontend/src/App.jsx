import { Applayout } from './app.routes.jsx'
import { AuthProvider } from './features/auth/states/auth.context.jsx';
import { InterviewProvider } from './features/interview/states/interview.context.jsx';

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <Applayout />
      </InterviewProvider>
    </AuthProvider >
  )

}

export default App;