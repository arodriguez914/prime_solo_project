import React from "react";
import { useSelector } from "react-redux";

function UpdateProfilePage() {
  const user = useSelector((store) => store.user);

  return (
    // <form className="updateFormPanel">
    //   <div>
        <h2 form className="updateFormPanel">Update Profile Page</h2>
        /* {!user.isStudent ? (
          <div>
            <div>
              <div>
                <label htmlFor="name">
                  Your Full Name:
                  <input
                    type="name"
                    name="name"
                    value={name}
                    required
                    onChange={(event) => setName(event.target.value)}
                  />
                </label>
              </div>
              <label htmlFor="parentName">
                Parent's Name:
                <input
                  type="parentName"
                  name="parentName"
                  value={parentName}
                  required
                  onChange={(event) => setParentName(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="parentEmail">
                Parent's Email Address:
                <input
                  type="parentEmail"
                  name="parentEmail"
                  value={parentEmail}
                  required
                  onChange={(event) => setParentEmail(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="parentPhone">
                Parent's Phone Number:
                <input
                  type="parentPhone"
                  name="parentPhone"
                  value={parentPhone}
                  required
                  onChange={(event) => setParentPhone(event.target.value)}
                />
              </label>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <label htmlFor="gradesTaught">
                Grades Qualified
                <input
                  type="gradesTaught"
                  name="gradesTaught"
                  value={gradesTaught}
                  required
                  onChange={(event) => setGradesTaught(event.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlFor="about">
                About You
                <input
                  type="about"
                  name="about"
                  value={about}
                  required
                  onChange={(event) => setAbout(event.target.value)}
                />
              </label>
            </div>
          </div>
        )}
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form> */
  );
}

export default UpdateProfilePage;
