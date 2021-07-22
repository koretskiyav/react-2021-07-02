import { useEffect} from 'react';
import { connect } from 'react-redux';
import Restaurants from '../restaurants';
import Header from '../header';

import {
  loadUsers,
} from '../../redux/features/users';


function App({loadUsers}) {
  useEffect(() => {
    loadUsers();
  }, []); // eslint-disable-line

  return (<div>
        <Header />
        <Restaurants />
      </div>
    );
  }

const mapDispatchToProps = (dispatch) => ({loadUsers: () => dispatch(loadUsers)});

export default connect(null, mapDispatchToProps)(App);