{editprofile ? (
    <Card className="card-user">
      <Card.Header>
        <Card.Title as="h5">Profile Progress</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="mb-4" onClick={() => setEditProfile(1)}>
          <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Basic Details</h6>
          <ProgressBar now={50} label={`${50}%`} variant={getColorVariant(50)} />
        </div>
        <div className="mb-4" onClick={() => setEditProfile(2)}>
          <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Personal Details</h6>
          <ProgressBar now={30} label={`${30}%`} variant={getColorVariant(30)} />
        </div>
        <div className="mb-4" onClick={() => setEditProfile(3)}>
          <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Professional Details</h6>
          <ProgressBar now={70} label={`${70}%`} variant={getColorVariant(70)} />
        </div>

        <div className="mb-4" onClick={() => setEditProfile(4)}>
          <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Social Media</h6>
          <ProgressBar now={20} label={`${20}%`} variant={getColorVariant(20)} />
        </div>
        <div className="mb-4" onClick={() => setEditProfile(5)}>
          <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Preference</h6>
          <ProgressBar now={30} label={`${30}%`} variant={getColorVariant(30)} />
        </div>
        <div className="mb-4" onClick={() => setEditProfile(6)}>
          <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Photos and videos</h6>
          <ProgressBar now={10} label={`${10}%`} variant={getColorVariant(10)} />
        </div>
        <div onClick={() => setEditProfile(7)}>
          <h6 style={{ fontFamily: 'Arial', marginBottom: '0.5rem' }}>Special Services</h6>
          <ProgressBar now={45} label={`${45}%`} variant={getColorVariant(45)} />
        </div>
      </Card.Body>
    </Card>

  ) : (
    <Card className="card-user">
      <div className="card-image">
        {/* <img
          alt="..."
          src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
        ></img> */}
      </div>
      <Card.Body>
        {userDetails && Object.entries(userDetails).map(([key, value]) => (
          <div key={key}>
            <div className="author">
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="..."
                  className="avatar border-gray"
                  src={apiEndpoint + value.headshot_image} // Access value.headshot_image
                />
                <p className={classes.username}>@{value.user_name}</p>
              </a>
              <p className="description text-center">
              {value.bio} {/* Access value.email */}
            </p>

            </div>
            
            
          </div>
        ))}
      </Card.Body>
      <hr></hr>
      <div className="button-container mr-auto ml-auto">
        <Button
          className="btn-simple btn-icon"
          href="#pablo"
          onClick={(e) => e.preventDefault()}
          variant="link"
        >
          <i className="fab fa-facebook-square"></i>
        </Button>
        <Button
          className="btn-simple btn-icon"
          href="#pablo"
          onClick={(e) => e.preventDefault()}
          variant="link"
        >
          <i className="fab fa-twitter"></i>
        </Button>
        <Button
          className="btn-simple btn-icon"
          href="#pablo"
          onClick={(e) => e.preventDefault()}
          variant="link"
        >
          <i className="fab fa-google-plus-square"></i>
        </Button>
      </div>
    </Card>
  )}
