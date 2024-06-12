const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const review = await service.read(request.params.reviewId);
  if (review) {
    response.locals.review = review;
    return next();
    }
    next({ status: 404, message: "Review cannot be found." });
}

async function update(req, res) {
  // TODO: Write your code here
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

// async function list(request, response) {
//   // TODO: Write your code here

//   response.json({  });
// }

// function hasMovieIdInPath(request, response, next) {
//   if (request.params.movieId) {
//     return next();
//   }
//   methodNotAllowed(request, response, next);
// }

// function noMovieIdInPath(request, response, next) {
//   if (request.params.movieId) {
//     return methodNotAllowed(request, response, next);
//   }
//   next();
// }


async function destroy(req, res) {
  await service.destroy(res.locals.review.review_id); 
  res.sendStatus(204);
}

module.exports = {
  reviewExists,
  update: [reviewExists, update],
  delete: [reviewExists, destroy]
}

// module.exports = {
//   destroy: [
//     noMovieIdInPath,
//     asyncErrorBoundary(reviewExists),
//     asyncErrorBoundary(destroy),
//   ],
//   list: [hasMovieIdInPath, asyncErrorBoundary(list)],
//   update: [
//     noMovieIdInPath,
//     asyncErrorBoundary(reviewExists),
//     asyncErrorBoundary(update),
//   ],
// };
