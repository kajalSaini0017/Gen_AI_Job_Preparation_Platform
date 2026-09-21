import { Applayout } from './app.routes.jsx'
import { AuthProvider } from './features/auth/states/auth.context.jsx';
import { InterviewProvider } from './features/interview/states/interview.context.jsx';
import { ThemeProvider } from './context/theme.context.jsx';

function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <InterviewProvider>
          <Applayout />
        </InterviewProvider>
      </AuthProvider>
    </ThemeProvider>
  )

}

export default App;