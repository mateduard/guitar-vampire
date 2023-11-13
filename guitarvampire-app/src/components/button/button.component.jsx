import './button.styles.scss';

const Button = ({ children, actionOnClick, classList='' }) => {

   const classes = ['btn', classList].join(' ');
  return <button onClick={actionOnClick} className={classes}>{children}</button>;
};

export default Button;
