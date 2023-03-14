import React from "react";

import './home.css';

const Home = () => {
    return (
      <>
        <div className="bg-mainBackground">
          <p className="text-3xl font-semibold text-dark text-center py-6">
            Where Developers find Projects, and Projects find Developers...
          </p>
          <div className="container sm:flex px-10">
            <div className="container flex-col justify-center content-center text-center lg:w-1/3 md:w-3/4 sm:w-3/4 px-5">
              <p>Find your next Project</p>
              <img
                src="https://dummyimage.com/250x175/000/fff"
                alt="placeholder"
                className="mx-auto"
              ></img>
              <p>
                Whether you're looking to build your portfolio, expand your
                skill set, or just work on a fun project with other developers,
                our app has something for you. Discover project ideas, connect
                with collaborators, and start building your dream project.
              </p>
            </div>
            <div className="container flex-col justify-center content-center text-center lg:w-1/3 md:w-3/4 sm:w-3/4 px-5">
              <p>Build amazing projects together</p>
              <img
                src="https://dummyimage.com/250x175/000/fff"
                alt="placeholder"
                className="mx-auto"
              ></img>
              <p>
                Our platform connects developers with shared passions and
                interests to collaborate on amazing projects. Work together to
                create something that you're proud of, while learning and
                growing as a developer.
              </p>
            </div>
            <div className="container flex-col justify-center content-center text-center lg:w-1/3 md:w-3/4 sm:w-3/4 px-5">
              <p>Connect with a community</p>
              <img
                src="https://dummyimage.com/250x175/000/fff"
                alt="placeholder"
                className="mx-auto"
              ></img>
              <p>
                Our app is more than just a platform for collaboration - it's a
                community of developers who share a common passion for building
                great software. Connect with other developers, share your
                experiences, and learn from others in our community.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mx-40 xlg:px-40 lg:px-30 ">
          <p className="text-center text-xl font-semibold py-5">About us</p>
          <p>
            Welcome to coDev! We believe that great projects come from
            collaboration and teamwork. Our platform is designed to connect
            developers who have project ideas with other developers who are
            looking for exciting projects to work on. Whether you're a seasoned
            developer or just starting out, you can use our app to find the
            perfect project to collaborate on. Our mission is to create a
            community of like-minded developers who are passionate about
            building great software. We believe that by working together, we can
            create amazing projects that we're all proud of. Our app is designed
            to make it easy for developers to connect, share ideas, and work
            together to build something amazing.
          </p>
        </div>
      </>
    );
}

export default Home;