import React, { Component } from "react";
import "./Post.css";
import { Avatar, Rate, Tag } from "antd";
import { Link } from "react-router-dom";
import SlideShow from "../components/commons/SlideShow";

class Post extends Component {
  render() {
    const { id, title, description, images, price, rating, user } = this.props;
    let images_arr = [];
    images.map((image) => {
      images_arr.push(
        localStorage.getItem("backend_url") + "/image/" + image.filename
      );
    });

    return (
      <div className="card">
        <div className="card_body">
          <div className="card_image_container">
            <SlideShow images={images_arr}></SlideShow>
          </div>
          <div className="card_content">
            <h5 className="card_title">
              <Link to={`/listings/${id}`} className="card_link">
                {title}
              </Link>
            </h5>
            <p className="card_description">{description}</p>
            <h5 className="card_price">€{price}</h5>
          </div>
        </div>
        <div className="card_badge_container">
          <Tag color="volcano">Market</Tag>
        </div>
        <div className="card_footer">
          <Avatar /*src={`${localStorage.getItem("backend_url")}/avatar/${user[0]?.id}.jpg`}*/>
            {user[0]?.name?.charAt(0) + ((!user[0].surname) ? user[0]?.name?.charAt(1) : user[0].surname.charAt(0))}
          </Avatar>
          <div className="px-3">{user[0].name + (!user[0].surname ? `` : ` ${user[0].surname}`)}</div>
          <span
            className="ant-rate-text"
            style={{ padding: "2px", marginLeft: "auto" }}
          >
            {rating}
          </span>
          <Rate
            allowHalf
            defaultValue={rating}
            style={{
              paddingBottom: "5px",
            }}
          />
        </div>
      </div>
    );
  }
}

export default Post;
