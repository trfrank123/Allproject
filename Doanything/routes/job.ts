import { Router } from "express";
import { client } from "../db";
import { getSessionUser } from "../session";
import formidable from "formidable";

export let jobRoutes = Router();

// employer upload photo
const uploadDir = "public/request_uploads";
const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 10000 * 1024 ** 2, // the default limit is 200KB
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});

jobRoutes.post("/post", (req, res) => {
  form.parse(req, async (err, fields, files) => {
    console.log({ err, fields, files });
    let current_time = new Date();
    if (!req.session.user) {
      res.end("not logged in");
    } else {
      let image = files.request_image;
      let imageFile = Array.isArray(image) ? image[0] : image;
      let image_filename = imageFile ? imageFile.newFilename : "";
      let sqlCol = [
        "post_user_id",
        "category_id",
        "skill_id",
        "title",
        "detail",
        "reward",
        "created_at",
        "start_time",
        "deadline",
        "is_deleted",
        "is_accepted",
        "is_applied",
        "is_completed",
        "location_area_id",
        "request_image",
      ];

      let sql = `INSERT INTO "request" (`;

      for (let i = 0; i < sqlCol.length; i++) {
        sql += `${sqlCol[i]},`;
      }

      sql = `${sql.substring(0, sql.length - 1)}) VALUES (`;

      for (let i = 0; i < sqlCol.length; i++) {
        sql += `$${i + 1},`;
      }

      sql = `${sql.substring(0, sql.length - 1)}) returning id`;

      let result = await client.query(sql, [
        req.session.user.id,
        fields.category_id,
        fields.skill_id,
        fields.title,
        fields.detail,
        fields.reward,
        current_time,
        fields.start_time,
        fields.deadline,
        false,
        false,
        false,
        false,
        fields.location,
        image_filename,
      ]);
      // console.log("job posted, job no:", result.rows[0].id);

      res.redirect(`/jobDetail/jobDetail.html?jobId=${result.rows[0].id}`);
    }
  });
});

// get all jobs (for filtering)
jobRoutes.get("/jobs", async (req, res) => {
  let result = await client.query(/* sql */ `
  select
   request.id
  ,request.title
  ,category.type as category_name
  ,request.start_time
  ,request.deadline
  ,skill.type as skill_name
  ,request.location
  ,request.detail
  ,request.reward
  ,users.nickname as employer_name
  from request
  inner join category on category.id = request.category_id
  inner join skill on skill.id = request.skill_id
  inner join users on users.id = request.post_user_id
  inner join freelancer_relationship on freelancer_relationship.request_id = request.id
  where request.is_deleted = false and request.is_accepted = false
`);
  let jobs = result.rows;
  res.json({ jobs });
});

// search suggestions
jobRoutes.get("/jobsByTitle", async (req, res) => {
  let result = await client.query(/* sql */ `
  select
   id
  ,title
  ,detail
  from request
  where is_deleted = false and is_accepted = false and is_completed = false
`);
  let jobsByTitle = result.rows;
  res.json({ jobsByTitle });
});

// multiple search filter
jobRoutes.get("/filter", async (req, res) => {
  let {
    skill_id,
    category_id,
    location_area_id,
    min_reward,
    max_reward,
    sorting_method,
    keyword,
  } = req.query;

  let keyword_sql = "true"
  
  if (keyword == undefined || keyword == null || keyword == "null"){
     keyword_sql = "true"  
    }else {
  keyword_sql = `(position(LOWER('${keyword}') in LOWER(title)) > 0 or position(LOWER('${keyword}') in LOWER(detail)) > 0)`;
  }

  let sql =
    /* sql */
    `select request.id, 
    post_user_id, 
    request.title, 
    request.is_applied, 
    request.is_accepted, 
    category.type as category_name, 
    request.start_time, 
    request.deadline, 
    skill.type as skill_name, 
    location.area as location_area, 
    request.location, 
    request.detail, 
    request.reward, 
    users.nickname as employer_name 
    from request 
    inner join category on category.id = request.category_id 
    inner join skill on skill.id = request.skill_id 
    inner join location on location.id = request.location_area_id 
    inner join users on users.id = request.post_user_id 
    where true and ${keyword_sql} and is_accepted = false`;
  let bindings = [];

  if (req.query) {
    //skill handel
    if (typeof skill_id === "string") {
      sql += " and skill.id = $" + (bindings.length + 1);
      bindings.push(skill_id);
    } else if (Array.isArray(skill_id)) {
      sql += " and (false";
      skill_id.forEach((skill) => {
        sql += " or skill.id = $" + (bindings.length + 1);
        bindings.push(skill);
      });
      sql += ")";
    }

    //category handel
    if (typeof category_id === "string") {
      sql += " and category.id = $" + (bindings.length + 1);
      bindings.push(category_id);
    } else if (Array.isArray(category_id)) {
      sql += " and (false";
      category_id.forEach((cat) => {
        sql += " or category.id = $" + (bindings.length + 1);
        bindings.push(cat);
      });
      sql += ")";
    }

    //location handel
    if (typeof location_area_id === "string") {
      sql += " and location.id = $" + (bindings.length + 1);
      bindings.push(location_area_id);
    } else if (Array.isArray(location_area_id)) {
      sql += " and (false";
      location_area_id.forEach((area) => {
        sql += " or location.id = $" + (bindings.length + 1);
        bindings.push(area);
      });
      sql += ")";
    }

    //reward handel
    if (min_reward) {
      sql += ` and reward >= ${min_reward}`;
    }

    if (max_reward) {
      sql += ` and reward <= ${max_reward}`;
    }

    if (min_reward && max_reward) {
      sql += ` and reward between ${min_reward} and ${max_reward}`;
    }

    if (sorting_method) {
      switch (sorting_method) {
        case "rewardMax":
          sql += ` order by reward desc`;
          break;
        case "rewardMin":
          sql += ` order by reward asc`;
          break;
        case "deadlineDesc":
          sql += ` order by deadline desc`;
          break;
        case "deadlineAsc":
          sql += ` order by deadline asc`;
        default:
          break;
      }
    }

    sql += `;`;
  }

  // console.log({ sql, bindings });

  let result = await client.query(sql, bindings);

  if (!result.rows[0]) {
    res.status(404);
    res.end("no job found!");
    return;
  }

  res.status(202);
  res.json(result.rows);
});

// search by keyword
jobRoutes.get("/search", async (req, res) => {
  let keyword = req.query.keyword;
  // let location = req.query.location;
  let keyword_sql;
  // let location_sql;

  // if (location) {
  //   location_sql = `position(LOWER('${location}') in LOWER(location)) > 0`;
  // } else {
  //   location_sql = true;
  // }

  if (keyword) {
    keyword_sql = `(position(LOWER('${keyword}') in LOWER(title)) > 0 or position(LOWER('${keyword}') in LOWER(detail)) > 0)`;
  } else {
    keyword_sql = true;
  }

  let sql = /* sql */ `
select
 request.id
 ,request.title
 ,request.detail
 ,category.type as category_name
,request.start_time
,request.deadline
,skill.type as skill_name
,request.location
,request.detail
,request.reward
,users.nickname as employer_name
from request
inner join category on category.id = request.category_id
inner join skill on skill.id = request.skill_id
inner join users on users.id = request.post_user_id

where request.is_deleted = false and ${keyword_sql}
`;
  let result = await client.query(sql);
  let jobs = result.rows;
  res.json({ jobs });
});

// get jobs by category
jobRoutes.get("/jobs/category/:category_id", async (req, res) => {
  let params = req.params.category_id;
  let result = await client.query(/* sql */ `
    select
    request.id
  , request.title
  , category.type as category_name
  , skill.type as skill_name
  , request.location
  , request.detail
  , request.reward
  , request.deadline
  from request
  inner join category on category.id = request.category_id
  inner join skill on skill.id = request.skill_id
  where request.category_id = ${params} and request.is_deleted = false
`);
  let job_by_category = result.rows;
  res.json({ job_by_category });
});

// get jobs by skill
jobRoutes.get("/jobs/skill/:skill_id", async (req, res) => {
  let params = req.params.skill_id;
  let result = await client.query(/* sql */ `
    select
    request.id
  , request.title
  , category.type as category_name
  , skill.type as skill_name
  , request.location
  , request.detail
  , request.reward
  , request.deadline
  from request
  inner join category on category.id = request.category_id
  inner join skill on skill.id = request.skill_id
  where request.skill_id = ${params} and request.is_deleted = false
`);
  let job_by_skill = result.rows;
  res.json({ job_by_skill });
});

// get 1 job by id
jobRoutes.get("/jobs/:job_id", async (req, res) => {
  let params = req.params.job_id;
  // console.log(typeof params);
  
  let result = await client.query(/* sql */ `
  select
   request.id
  ,request.title
  ,category.type as category_name
  ,request.start_time
  ,request.deadline
  ,skill.type as skill_name
  ,location.area as location
  ,request.detail
  ,request.reward
  ,request.request_image as image
  ,users.nickname as employer_name
  ,users.intro as employer_intro
  ,users.id as employer_id
  ,users.profile_image
  from request
  inner join category on category.id = request.category_id
  inner join skill on skill.id = request.skill_id
  inner join users on users.id = request.post_user_id
  inner join location on location.id = request.location_area_id
  where request.id = ${params} and request.is_deleted = false
`);
  console.log(result.rows);
  
  let job_id = await result.rows;
  console.log(job_id);
  
  res.json({ job_id });
});

jobRoutes.get('/jobStatus/:job_id', async (req, res) =>{
  let params = req.params.job_id;
  let result = await client.query(/* sql */ `
    select * from freelancer_relationship where request_id = ${params}
  `)
  if(!result.rows[0]) {
    res.status(404)
    res.end('no relationship found')
    return
  }
  res.status(202)
  res.json(result.rows)
}) 

// get jobs by one employer
jobRoutes.get("/employer/:employer_id", async (req, res) => {
  let params = req.params.employer_id;
  let result = await client.query(/* sql */ `
    select
    users.id
  , request.id
  , request.title
  , request.detail
  , skill.type as skill_name
  , category.type as category_name
  from request
  inner join skill on skill.id = request.skill_id
  inner join category on category.id = request.category_id
  inner join users on users.id = request.post_user_id
  where users.id = ${params} and users.is_employer = true and request.is_deleted = false
`);
  let employer_id = result.rows;
  res.json({ employer_id });
});

// get jobs by one employer and status
jobRoutes.get("/employer/:employer_id/:status", async (req, res) => {
  let para1 = req.params.employer_id;
  let para2 = req.params.status;
  let condition = "";

  switch (para2) {
    case "waiting":
      condition = ` 
      request.is_accepted = false 
      and request.is_completed = false 
      and request.is_deleted = false`;
      break;
    case "accepted":
      condition = ` 
      request.is_accepted = true 
      and request.is_completed = false 
      and request.is_deleted = false`;
      break;
    case "completed":
      condition = ` 
      request.is_accepted = true 
      and request.is_completed = true 
      and request.is_deleted = false`;
    default:
      break;
  }

  let result = await client.query(/* sql */ `
    select
    users.id
  , request.id
  , request.title
  , request.detail
  , request.reward
  , request.location
  , request.location_area_id
  , location.area
  , request.start_time
  , request.deadline
  ,request.request_image as image
  , skill.type as skill_name
  , category.type as category_name
  from request
  inner join skill on skill.id = request.skill_id
  inner join category on category.id = request.category_id
  inner join users on users.id = request.post_user_id
  inner join location on request.location_area_id = location.id
  where users.id = ${para1} and request.is_deleted = false and ${condition}
  ORDER BY request.id DESC
`);
  let employer_id = result.rows;
  res.json({ employer_id });
});

// get 1 freelancer detail (job matched)
jobRoutes.get("/freelancer/:freelancer_id", async (req, res) => {
  let params = req.params.freelancer_id;
  let result = await client.query(/* sql */ `
    select
    users.id
,    users.nickname
,    users.email
,    users.phone
,    users.profile_image
,    users.intro
from users
where users.id = ${params}
`);
  let freelancer_id = result.rows;
  res.json({ freelancer_id });
});

// get all skills
jobRoutes.get("/filter/skills", async (req, res) => {
  let skills = await client.query(`select * from skill;`);

  if (!skills.rows) {
    res.status(404);
    res.end("no skill found!");
    return;
  }

  res.status(202);
  res.json(skills.rows);
});

// get all category
jobRoutes.get("/filter/categories", async (req, res) => {
  let cats = await client.query(`select * from category`);

  if (!cats.rows) {
    res.status(404);
    res.end("no category found!");
    return;
  }

  res.status(202);
  res.json(cats.rows);
});

//get all location area
jobRoutes.get("/filter/locations", async (req, res) => {
  let locations = await client.query(`select * from location`);

  if (!locations.rows) {
    res.status(404);
    res.end("no location found!");
    return;
  }
  res.status(202);
  res.json(locations.rows);
});

// list job by status
jobRoutes.get("/freelancer/:userId/:jobStatus", async (req, res) => {
  const { userId, jobStatus } = req.params;
  console.log(userId, jobStatus);

  if (!userId) {
    res.status(400);
    res.end("Missing User id!");
    return;
  }

  if (!jobStatus) {
    res.status(400);
    res.end("Missing job status!");
    return;
  }

  const Jobs = await client.query(/* sql */ `
      select freelancer_relationship.freelancer_user_id as accept_user_id,
      request.post_user_id,
      request.id as request_id,
      category.type as category_name,
      skill.type as skill_name,
      request.title,
      request.detail,
      request.reward,
      request.start_time,
      request.deadline,
      request.require_worker,
      request.location,
      request.location_area_id,
      location.area,
      request.is_accepted,
      request.is_deleted,
      request.is_completed,
      request.request_image as image,
      freelancer_relationship.status as job_status
      from freelancer_relationship
      inner join request on freelancer_relationship.request_id = request.id
      inner join category on request.category_id = category.id
      inner join skill on request.skill_id = skill.id
      inner join location on request.location_area_id = location.id
      where freelancer_relationship.freelancer_user_id = ${userId} and freelancer_relationship.status = '${jobStatus}'
      ORDER BY request.id DESC;
      `);

  res.status(202);
  res.json(Jobs.rows);
});

// freelancer accept the job
jobRoutes.post("/accept", async (req, res) => {
  try {
    let user = getSessionUser(req, res);
    if (!user) {
      res.status(400);
      res.end("This API not available to register");
      res.redirect("/login");
      return;
    }

    const { requestId } = req.body;

    if (!user?.id) {
      res.status(400);
      res.end("Missing user id!");
      return;
    }

    if (!requestId) {
      res.status(400);
      res.end("Missing request id!");
      return;
    }
    // check the user is employer or not
    let employer = await client.query(
      `select post_user_id from request where id = ${requestId}`
    );
    //check the job is applied and have relationship or not
    let relationship = await client.query(
      `select freelancer_user_id, request_id from freelancer_relationship where freelancer_user_id = ${user.id} and request_id = ${requestId};`
    );
    if(employer.rows[0].post_user_id == user.id) {
      res.status(400);
      res.end("Employer cannot accept the job post by them.");
      return;
    } else if (relationship.rows[0]) {
      res.status(400);
      res.end("Already accept this job!");
      return;
    } else {
      // if didn't applied, add relationship and updated the request as is applied
      await client.query(
        `insert into "freelancer_relationship" (freelancer_user_id, request_id, status) values (${user.id}, ${requestId}, 'applied');`
      );
      await client.query(
        `update "request" set is_applied = true where id = ${requestId};`
      );
      res.status(202);
      res.end("Accept job successfully!");
    }
  } catch (err) {
    res.status(500);
    res.end(String(err));
  }
});

// freelancer cancel job
jobRoutes.delete("/cancel", async (req, res) => {
  try {
    const { userId, requestId } = req.body;
    console.log(userId, requestId);

    if (!userId) {
      res.status(400);
      res.end("Missing user id!");
      return;
    }

    if (!requestId) {
      res.status(400);
      res.end("Missing request id!");
      return;
    }

    let job = await client.query(
      `select * from freelancer_relationship where freelancer_user_id = ${userId} and request_id = ${requestId};`
    );

    if (job) {
      await client.query(
        `delete from freelancer_relationship where request_id = ${requestId} and freelancer_user_id = ${userId};`
      );
      await client.query(
        `update request set is_applied = false where request.id = ${requestId};`
      );
      res.status(202);
      res.end("Delete job successfully!");
    }
  } catch (err) {
    res.status(500);
    res.end(String(err));
  }
});

// employer cancel job
jobRoutes.delete("/employerCancel", async (req, res) => {
  try {
    const { userId, requestId } = req.body;
    console.log(userId, requestId);

    if (!userId) {
      res.status(400);
      res.end("Missing user id!");
      return;
    }

    if (!requestId) {
      res.status(400);
      res.end("Missing request id!");
      return;
    }

    let job = await client.query(
      `select * from request where post_user_id = ${userId} and id = ${requestId};`
    );

    if (job) {
      // TODO change delete to update
      // delete any applied freelancer_relationship
      await client.query(
        `delete from messenger where request_id = ${requestId} and (sender_id = ${userId} or receiver_id=${userId});`
      );

      await client.query(
        `delete from freelancer_relationship where request_id = ${requestId};`
      );
      await client.query(
        `delete from request where id = ${requestId} and post_user_id = ${userId};`
      );
      // await client.query(
      //   `update request set is_deleted = true where request.id = ${requestId};`
      // );
      res.status(202);
      res.end("Delete job successfully!");
    }
  } catch (err) {
    res.status(500);
    res.end(String(err));
  }
});

// employer choose freelancer
jobRoutes.get("/findAppliedFreelancer/:requestId", async (req, res) => {
  let params = req.params.requestId;

  try {
    if (!params) {
      res.status(400);
      res.end("Missing request id!");
      return;
    }

    let result = await client.query(/* sql */ ` 
    select
    users.id,
    users.nickname 
    from freelancer_relationship
    inner join users on users.id = freelancer_relationship.freelancer_user_id
    inner join request on request.id = freelancer_relationship.request_id
    where freelancer_relationship.status = 'applied' and request.id = ${params};
    `);

    if (result) {
      res.json(result.rows);
    }
  } catch (err) {
    res.status(500);
    res.end(String(err));
  }
});

// employer choose freelancer
jobRoutes.post("/matchFreelancer", async (req, res) => {
  const { requestId } = req.body;
  const { chosenFreelancerId } = req.body;

  try {
    // UPDATE table freelancer relationship
    await client.query(/* sql */ `
      update
        "freelancer_relationship" set
        status = 'confirmed'
        where freelancer_user_id = ${chosenFreelancerId}
        and request_id = ${requestId}
            
    `);

    // UPDATE table freelancer relationship
    await client.query(/* sql */ `
      UPDATE "request" SET is_accepted = true where id = ${requestId};            
    `);

    res.status(202);
    res.end("Choose fraalancer successfully!");
  } catch (err) {
    res.status(500);
    res.end(String(err));
  }
});

// employer confirm the job is completed
jobRoutes.post("/completeJob", async (req, res) => {
  const { requestId } = req.body;
  // const { chosenFreelancerId } = req.body;

  try {
    // UPDATE table freelancer relationship
    await client.query(/* sql */ `  
      UPDATE "request" SET is_completed = true where id = ${requestId};            
    `);

    await client.query(/* sql */ `  
    UPDATE "freelancer_relationship" SET status = 'completed' where request_id = ${requestId};            
  `);

    res.status(202);
    res.end("The job completed successfully!");
  } catch (err) {
    res.status(500);
    res.end(String(err));
  }
});
