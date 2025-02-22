import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/commons/PageWrapper";
import "../dummy/color.css";
import "./Listing.css";
import { Avatar, Rate, Tag, Table } from "antd";
import ImageSliderComponent from "../components/commons/ImageSlider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faShareNodes, faLocationDot, faEuroSign, faBolt } from '@fortawesome/free-solid-svg-icons'


export function Listing() {
  let { id } = useParams();
  const [listingDetails, setListingDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  let user_id;

  useEffect(() => {
    if (id != undefined) {
      axios
        .get(localStorage.getItem("backend_url") + "/api/post/" + id)
        .then((res) => {
          setListingDetails(res.data);
          user_id = res.data.user_id;
          if (user_id != undefined) {
            axios
              .get(localStorage.getItem("backend_url") + "/api/user/" + user_id)
              .then((res) => {
                setUserDetails(res.data[0]);
                console.log(listingDetails, userDetails)
              });
          }
        });
    }

  }, []);

  const images = [
    {
      original: "https://images.unsplash.com/photo-1585255318859-f5c15f4cffe9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixlib=rb-1.2.1&q=80&w=400",
      thumbnail: "https://images.unsplash.com/photo-1585255318859-f5c15f4cffe9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
      original: "https://images.unsplash.com/photo-1584226761916-3fd67ab5ac3a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixlib=rb-1.2.1&q=80&w=400",
      thumbnail: "https://images.unsplash.com/photo-1584226761916-3fd67ab5ac3a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixlib=rb-1.2.1&q=80&w=400",
    }
  ];

  const tableColumns = [
    {
      title: 'Connection',
      dataIndex: 'connection',
      key: 'connection',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tier',
      dataIndex: 'tier',
      key: 'tier',
    },
    {
      title: 'Sponsorship',
      dataIndex: 'sponsorship',
      key: 'sponsorship',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <a>Propose as refeer</a>
      ),
    },

  ]
  const sponsorData = [
    {
      key: '1',
      name: 'John Brown',
      tier: 1,
      sponsorship: '€ 50',
      connection: '1st-degree',
      tags: [],
    },
    {
      key: '2',
      name: 'Jim Green',
      tier: 2,
      sponsorship: '€ 50',
      connection: '2nd-degree',
      tags: ['admin'],
    },
    {
      key: '3',
      name: 'Joe Black',
      tier: 1,
      sponsorship: '€ 100',
      connection: '2nd-degree',
      tags: ['senior'],
    },
  ];

  return (

    <PageWrapper>
      <div className="container">
        <div className="top_section">
          <div className="images_container">
            {images !== undefined ? <ImageSliderComponent images={images} /> : <p>Pippo</p>}
            {/* <ImageSliderComponent images={images} /> */}
          </div>
          <div className="info main_info">
            <div className="main-content">
              <div className="tag-body">
                <div className="tag-content">
                  <Tag className="tag-title">{listingDetails.category}</Tag>
                </div>
                <div className="tag-content">
                  <span className="tag-link">
                    <FontAwesomeIcon icon={faShareNodes} />
                  </span>
                  <span className="tag-following">
                    <FontAwesomeIcon icon={faHeart} />

                  </span>
                </div>
              </div>
              <div className="post-content">
                <div className="post-header">
                  <div className="post-date">
                    <span>22 feb 21:16</span>
                  </div>
                  <div className="post-follow">
                    <FontAwesomeIcon icon={faHeart} style={{ margin: 'auto' }} />
                    <span className="post-follow-number">9</span>
                  </div>
                  <div className="post-id">
                    <span>{`ID:  ${listingDetails.id}`}</span>
                  </div>
                </div>
                <div className="post-body">
                  <div className="post-title">{listingDetails.title}</div>
                  <div className="post-locate">
                    <FontAwesomeIcon icon={faLocationDot} style={{ paddingRight: '.5rem' }} />
                    <span>VIGODARZERE (PD)</span>
                  </div>
                  <div className="post-price"><FontAwesomeIcon icon={listingDetails.currency === 'SAT' ? faBolt : faEuroSign} style={{ paddingRight: '.5rem' }} /> {parseFloat(listingDetails.price)} </div>
                </div>
              </div>
            </div>
            <div className="user-content">
              {/*               <div className="avatar-content">
                <span style={{ margin: 'auto' }}>L</span>
              </div> */}
              <Avatar /*src={`${localStorage.getItem("backend_url")}/avatar/${user[0]?.id}.jpg`}*/>
                {userDetails?.name?.charAt(0) + ((!userDetails.surname) ? userDetails?.name?.charAt(1) : userDetails.surname.charAt(0))}
              </Avatar>
              <div className="detail-content">
                <span className="user-name">{userDetails.name + (!userDetails.surname ? `` : ` ${userDetails.surname}`)}</span>
                <div>
                  <span className="user-rate">5.0</span>
                  <Rate
                    allowHalf={false}
                    defaultValue={5}
                    style={{
                      paddingBottom: "5px",
                      paddingLeft: "0.5rem"
                    }}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom_section">
          <div className="info summary_info">
            <div className="header summary-header">
              main data
            </div>
            <div className="summary-section">
              <div className="summary-body">
                <div className="summary-key">
                  <span>Telephone Type</span>
                </div>
                <div className="summary-content">
                  <div>Mobile Phone</div>
                  <div>Smart Phone</div>
                </div>
              </div>
              <div className="summary-body">
                <div className="summary-key">
                  Condition
                </div>
                <div className="summary-content">
                  <span>Grade A+ Excellent and well preserved</span>
                </div>
              </div>
            </div>
          </div>
          <div className="info description_info">
            <div className="header description-header">
              Description
            </div>
            <div className="description-content">
              {listingDetails.description}
            </div>
          </div>
          <div className="info advertiser_info">
            <div className="header advertiser-header">
              Advertiser
            </div>
            <div className="advertiser-section">
              <div className="user-info-section">
                {/* <div className="avatar-content">
                  <span style={{ margin: 'auto' }}>L</span>
                </div> */}
                <Avatar /*src={`${localStorage.getItem("backend_url")}/avatar/${user[0]?.id}.jpg`}*/>
                  {userDetails?.name?.charAt(0) + ((!userDetails.surname) ? userDetails?.name?.charAt(1) : userDetails.surname.charAt(0))}
                </Avatar>
                <div className="detail-content">
                  <span className="user-name">{userDetails.name + (!userDetails.surname ? `` : ` ${userDetails.surname}`)}</span>
                  <div style={{ lineHeight: 1.5 }}>
                    <span className="user-rate">5.0</span>
                    <Rate
                      allowHalf={false}
                      defaultValue={5}
                      style={{
                        paddingBottom: "5px",
                        paddingLeft: "0.5rem"
                      }}
                      disabled={true}
                    />
                  </div>
                  <div>
                    Pubblica da Aprile 2022
                  </div>
                  <div>
                    Ultimo accesso di recente
                  </div>
                </div>
              </div>
              <div className="advertiser-content">
                <div className="advertiser-body">
                  <div className="advertiser-body-header">
                    € 200
                  </div>
                  <div className="advertiser-body-text">
                    Sponsored
                  </div>
                </div>
                <div className="advertiser-body">
                  <div className="advertiser-body-header">
                    € 250
                  </div>
                  <div className="advertiser-body-text">
                    Sponsoring
                  </div>
                </div>
                <div className="advertiser-body">
                  <div className="advertiser-body-header">
                    3
                  </div>
                  <div className="advertiser-body-text">
                    Sponsors
                  </div>
                </div>
                <div className="advertiser-body">
                  <div className="advertiser-body-header">
                    15
                  </div>
                  <div className="advertiser-body-text">
                    Completed transactions
                  </div>
                </div>
                <div className="advertiser-body">
                  <div className="advertiser-body-header">
                    22
                  </div>
                  <div className="advertiser-body-text">
                    Published posts
                  </div>
                </div>
                <div className="advertiser-body">
                  <div className="advertiser-body-header">
                    1
                  </div>
                  <div className="advertiser-body-text">
                    Online posts
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="info sponsors_info">
              <div className="header sponsors-header">
                Sponsors
              </div>
              <div className="sponsors-section">
                <Table columns={tableColumns} dataSource={sponsorData} pagination={{
                  position: ["none"]
                }} />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </PageWrapper >
  );
}
export default Listing;
