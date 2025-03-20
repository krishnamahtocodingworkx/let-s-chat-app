import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <div className="col-sm-10 col-sm-offset-1">
              <div className="four_zero_four_bg"></div>
              <div className="content_box_404">
                <h2 className="error_text">Oops! You seem to be lost</h2>
                <p className="error_message">
                  The page you're looking for isn't available. Let's get you
                  back home.
                </p>
                <Link to={"/signup"} className="link_404">
                  Go to Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
