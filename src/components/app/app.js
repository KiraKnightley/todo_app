import React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import TaskList from '../task-list/task-list';
import './app.css';


const App = () => {
  return (
    <section className="todoapp">
      <Header />
      <TaskList />
      <Footer />
    </section>
  );
}

export default App;
