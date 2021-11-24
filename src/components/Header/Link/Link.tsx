import { NavLink } from 'react-router-dom';

function HeaderLink(props: any) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => {
        const classes = 'py-1 text-gray-700 font-medium hover:text-gray-800';
        return isActive
          ? classes +
              ' text-blue-700 hover:text-blue-700 font-bold border-blue-700 border-b-2'
          : '';
      }}
    >
      {props.children}
    </NavLink>
  );
}

export default HeaderLink;
