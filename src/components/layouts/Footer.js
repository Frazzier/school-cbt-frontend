const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-m12">© {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
