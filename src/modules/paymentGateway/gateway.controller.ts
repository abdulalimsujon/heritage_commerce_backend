import { gatewayService } from './gateway.service';
import catchAsync from '../../utilities/catchAsync';

const createGateway = catchAsync(async (req, res) => {
  const { price } = req.body;

  const result = await gatewayService.createGateway(price);

  res.send({
    clientSecret: result,
  });
});

export const gatewayController = {
  createGateway,
};
