import './UserProfile.scss';
import './PlanningListItem.scss';
import Header from './Header';
import PlanningList from './PlanningList';


export default function UserProfile() {

  const obj = JSON.parse(localStorage.getItem("user"));


return (
  <main className='user-profile'>
    <section className='header'>
      <Header />
    </section>

    <section className='profile-header'>
    <section className='user_profile_title' style={{ 'marginTop': '100px' }}><h2> {obj.first_name}'s Profile</h2>
    </section >
    <section className='user_profile_container'>
    <button  className='user_profile_button'> <a href="/places">Start Your New Journey</a></button>
    </section>
    </section>

    <section className='user_profile' style={{ 'marginTop': '10px'}}>My Plans</section>
      <br /><br />

        <div className='user_profile_list'>
          {localStorage.getItem("user") && <PlanningList />}     
        </div>

    
  </main>
);
}