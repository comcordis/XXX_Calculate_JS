var XXX_Calculate =
{
	////////////////////
	// BMI
	////////////////////
		
	getBMI: function (weight, length)
	{
		return weight / ((length / 100) * (length / 100));
	},
	
	////////////////////
	// Brassiere
	////////////////////
		
	getBrassiereSize: function (bandSize, bustSize, system)
	{
		var result = false;
		
		bandSize = XXX_Type.makeNumber(bandSize);
		bustSize = XXX_Type.makeNumber(bustSize);
		
		bandSize = XXX_UnitConverter.centimeterToInch(bandSize);
		bustSize = XXX_UnitConverter.centimeterToInch(bustSize);
		
		switch (system)
		{
			case 'usa':
				var cupVolumes = ['AA', 'A', 'B', 'C', 'DD/E', 'DDD/F', 'G', 'H', 'I', 'J', 'K'];
				
				bandSize += 5;
				
				if (XXX_Type.isUnevenNumber(bandSize))
				{
					bandSize -= 1;	
				}
				
				var cup = XXX_Number.highest(XXX_Number.round(bustSize - bandSize), 0);
				
				result =
				{
					band: XXX_Number.round(bandSize),
					cupVolume: cupVolumes[cup]
				};
				break;
			case 'uk':
				var cupVolumes = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'G', 'GG', 'H', 'HH', 'J'];
				
				bandSize += 5;
				
				if (XXX_Type.isUnevenNumber(bandSize))
				{
					bandSize -= 1;	
				}
				
				var cup = XXX_Number.highest(XXX_Number.round(bustSize - bandSize), 0);
				
				result =
				{
					band: XXX_Number.round(bandSize),
					cupVolume: cupVolumes[cup]
				};
				break;
			case 'aus':
				var cupVolumes = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
				
				bandSize += 5;
				
				if (XXX_Type.isUnevenNumber(bandSize))
				{
					bandSize -= 1;	
				}
				
				var cup = XXX_Number.highest(XXX_Number.round(bustSize - bandSize), 0);
				
				bandSize -= 22;
				
				
				result =
				{
					band: XXX_Number.round(bandSize),
					cupVolume: cupVolumes[cup]
				};
				break;
			case 'fr':
				var cupVolumes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
				
				bandSize += 5;
				
				if (XXX_Type.isUnevenNumber(bandSize))
				{
					bandSize -= 1;	
				}
				
				var cup = XXX_Number.highest(XXX_Number.round(bustSize - bandSize), 0);
				
				bandSize -= 30;				
				bandSize = XXX_UnitConverter.inchToCentimeter(bandSize);
				bandSize += 80;
				
				result =
				{
					band: XXX_Number.round(bandSize),
					cupVolume: cupVolumes[cup]
				};
				break;
			case 'eu':
				var cupVolumes = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
				
				bandSize += 5;
				
				if (XXX_Type.isUnevenNumber(bandSize))
				{
					bandSize -= 1;	
				}
				
				var cup = XXX_Number.highest(XXX_Number.round(bustSize - bandSize), 0);
				
				bandSize -= 30;
				bandSize = XXX_UnitConverter.inchToCentimeter(bandSize);
				bandSize += 65;
				
				result =
				{
					band: XXX_Number.round(bandSize),
					cupVolume: cupVolumes[cup]
				};
				break;
		}
		
		return result;
	},
	
	////////////////////
	// Distance
	////////////////////
	
	getDistanceBetweenCoordinates: function (coordinate1, coordinate2)
	{
		// Kilometers
		var earthCirmcumference = 40075.16;
		
		// Convert degrees to radians
		coordinate1.latitude = (coordinate1.latitude * XXX_Number.pi()) / 180;
		coordinate1.longitude = ($coordinate1.longitude * XXX_Number.pi()) / 180;
		coordinate2.latitude = ($coordinate2.latitude * XXX_Number.pi()) / 180;
		coordinate2.longitude = ($coordinate2.longitude * XXX_Number.pi()) / 180;
		
		var a = XXX_Number.power(XXX_Number.sine(coordinate2.latitude - coordinate1.latitude / 2), 2);
		var b = XXX_Number.cosine(coordinate1.latitude) * XXX_Number.cosine(coordinate2.latitude);
		b *= XXX_Number.power(XXX_Number.sine(coordinate2.longitude - coordinate1.longitude / 2), 2);
		a += b;
		var c = 2 * XXX_Number.arcSine(XXX_Number.lowest(1, XXX_Number.squareRoot(a)));
		
		var earthRadius = (earthCirmcumference / XXX_Number.pi()) / 2;
		
		var distance = earthRadius * c;
		
		return distance;
	},
	
	////////////////////
	// Selection area
	////////////////////
	
	getSelectionArea: function (containerSize, minimumSize, startPositionWithin, offset)
	{
		var x, y = 0;
		var width = containerSize.width;
		var height = containerSize.height;		
			
		// Top Left
		if (offset.x < 0 && offset.y < 0)
		{			
			startPositionWithin.x = XXX_Number.highest(startPositionWithin.x, minimumSize.width);
			startPositionWithin.y = XXX_Number.highest(startPositionWithin.y, minimumSize.height);
			
			offset.x = XXX_Number.highest(XXX_Number.lowest(offset.x, -minimumSize.width), -startPositionWithin.x);
			offset.y = XXX_Number.highest(XXX_Number.lowest(offset.y, -minimumSize.height), -startPositionWithin.y);
			
			x = startPositionWithin.x - XXX_Number.absolute(offset.x);
			y = startPositionWithin.y - XXX_Number.absolute(offset.y);
			
			width = XXX_Number.absolute(offset.x);
			height = XXX_Number.absolute(offset.y);
		}
		// Top Right
		else if (offset.x >= 0 && offset.y < 0)
		{
			startPositionWithin.x = XXX_Number.lowest(startPositionWithin.x, (containerSize.width - minimumSize.width));
			startPositionWithin.y = XXX_Number.highest(startPositionWithin.y, minimumSize.height);
			
			offset.x = XXX_Number.lowest(XXX_Number.highest(offset.x, minimumSize.width), (containerSize.width - startPositionWithin.x));
			offset.y = XXX_Number.highest(XXX_Number.lowest(offset.y, -minimumSize.height), -startPositionWithin.y);
			
			x = startPositionWithin.x;
			y = startPositionWithin.y - XXX_Number.absolute(offset.y);
			
			width = offset.x;
			height = XXX_Number.absolute(offset.y);
		}
		// Bottom Left
		else if (offset.x < 0 && offset.y >= 0)
		{
			startPositionWithin.x = XXX_Number.highest(startPositionWithin.x, minimumSize.width);
			startPositionWithin.y = XXX_Number.lowest(startPositionWithin.y, (containerSize.height - minimumSize.height));
			
			offset.x = XXX_Number.highest(XXX_Number.lowest(offset.x, -minimumSize.width), -startPositionWithin.x);
			offset.y = XXX_Number.lowest(XXX_Number.highest(offset.y, minimumSize.height), (containerSize.height - startPositionWithin.y));
			
			x = startPositionWithin.x - XXX_Number.absolute(offset.x);
			y = startPositionWithin.y;
			
			width = XXX_Number.absolute(offset.x);
			height = offset.y;
		}
		// Bottom Right
		else if (offset.x >= 0 && offset.y >= 0)
		{
			startPositionWithin.x = XXX_Number.lowest(startPositionWithin.x, (containerSize.width - minimumSize.width));
			startPositionWithin.y = XXX_Number.lowest(startPositionWithin.y, (containerSize.height - minimumSize.height));
			
			offset.x = XXX_Number.lowest(XXX_Number.highest(offset.x, minimumSize.width), (containerSize.width - startPositionWithin.x));
			offset.y = XXX_Number.lowest(XXX_Number.highest(offset.y, minimumSize.height), (containerSize.height - startPositionWithin.y));
			
			x = startPositionWithin.x;
			y = startPositionWithin.y;
			
			width = offset.x;
			height = offset.y;
		}
		
		var result =
		{
			x: x,
			y: y,
			width: width,
			height: height
		};
		
		return result;
	},
	
	////////////////////
	// Rectangle
	////////////////////
	
	getScaledRectangleSize: function (originalWidth, originalHeight, desiredWidth, desiredHeight, type, enlargeSmallerOriginal)
	{
		if (!XXX_Type.isPositiveNumber(desiredWidth))
		{
			desiredWidth = 0;
		}
		
		if (!XXX_Type.isPositiveNumber(desiredHeight))
		{
			desiredHeight = 0;
		}
		
		if (!(type == 'minimum' || type == 'maximum'))
		{
			type = 'maximum';
		}
		
		if (!XXX_Type.isBoolean(enlargeSmallerOriginal))
		{
			enlargeSmallerOriginal = false;
		}
		
		var originalRatio = (originalWidth / originalHeight);
		var desiredRatio = (desiredWidth / desiredHeight);
		
		// What type of ratio is the original compared to desired, either "landscape" or "portrait"
		var moreLandscape = (originalRatio > desiredRatio) ? true : false;
		
		var wider = (originalWidth > desiredWidth);
		var higher = (originalHeight > desiredHeight);
		
		var scaleBy = 'none';
		
		// Bigger
		if (wider && higher)
		{
			if (moreLandscape)
			{
				// Scale down by height
				if (type == 'minimum')
				{
					scaleBy = 'height';
				}
				// Scale down by width
				else
				{
					scaleBy = 'width';
				}
			}
			else
			{
				// Scale down by width
				if (type == 'minimum')
				{
					scaleBy = 'width';
				}
				// Scale down by height
				else
				{
					scaleBy = 'height';
				}
			}
		}
		// Overlapping by width
		else if (wider)
		{
			// Scale up by height
			if (type == 'minimum')
			{
				scaleBy = 'height';
			}
			// Scale down by width
			else
			{
				scaleBy = 'width';
			}
		}
		// Overlapping by height
		else if (higher)
		{
			// Scale up by width
			if (type == 'minimum')
			{
				scaleBy = 'width';
			}
			// Scale down by height
			else
			{
				scaleBy = 'height';
			}
		}
		// Smaller
		else
		{
			if (type == 'minimum')
			{
				// Scale up by height
				if (moreLandscape)
				{
					scaleBy = 'height';
				}
				// Scale up by width
				else
				{
					scaleBy = 'width';
				}
			}
			else if (enlargeSmallerOriginal)
			{
				// Scale up by width
				if (moreLandscape)
				{
					scaleBy = 'width';
				}
				// Scale up by height
				else
				{
					scaleBy = 'height';
				}
			}
		}
		
		var newWidth;
		var newHeight;
		
		switch (scaleBy)
		{
			case 'width':
				newWidth = desiredWidth;
				newHeight = (originalHeight * (desiredWidth / originalWidth));
				break;
			case 'height':
				newWidth = (originalWidth * (desiredHeight / originalHeight));
				newHeight = desiredHeight;
				break;
			default:
				newWidth = originalWidth;
				newHeight = originalHeight;
				break;
		}
		
		var result =
		{
			width: Math.floor(newWidth),
			height: Math.floor(newHeight)
		};
		
		return result;
	},
	
	/*
	
	topLeft:
	SSS
	  O
	
	top:
	SSS
	 O
	 
	topRight:
	SSS
	O
	
	left:
	S
	SO
	S
	
	right:
	 S
	OS
	 S
	
	bottomLeft:
	  O
	SSS
	
	bottom:
	 O
	SSS
	
	bottomRight:
	O
	SSS
	
	*/
	
	getRelativeRectanglePositions: function (offsetRectanglePosition, offsetRectangleSize, sideRectangleSize, position, spacing)
	{
		spacing = XXX_Default.toInteger(spacing, 0);
		
		var sideRectanglePosition =
		{
			x: 0,
			y: 0
		};
		
		switch (position)
		{
			case 'topLeft':
				sideRectanglePosition =
				{
					x: (offsetRectanglePosition.x + offsetRectangleSize.width) - sideRectangleSize.width,
					y: offsetRectanglePosition.y - sideRectangleSize.height - spacing
				};
				break;
			case 'top':
				sideRectanglePosition =
				{
					x: offsetRectanglePosition.x - XXX_Number.floor((sideRectangleSize.width - offsetRectangleSize.width) / 2),
					y: offsetRectanglePosition.y - sideRectangleSize.height - spacing
				};
				break;
			case 'topRight':
				sideRectanglePosition =
				{
					x: offsetRectanglePosition.x,
					y: offsetRectanglePosition.y - sideRectangleSize.height - spacing
				};
				break;
			case 'left':
				sideRectanglePosition =
				{
					x: offsetRectanglePosition.x - sideRectangleSize.width - spacing,
					y: offsetRectanglePosition.y - XXX_Number.floor((sideRectangleSize.height - offsetRectangleSize.height) / 2)
				};
				break;
			case 'right':
				sideRectanglePosition =
				{
					x: offsetRectanglePosition.x + offsetRectangleSize.width + spacing,
					y: offsetRectanglePosition.y - XXX_Number.floor((sideRectangleSize.height - offsetRectangleSize.height) / 2)
				};
				break;
			case 'bottomLeft':
				sideRectanglePosition =
				{
					x: (offsetRectanglePosition.x + offsetRectangleSize.width) - sideRectangleSize.width,
					y: offsetRectanglePosition.y + offsetRectangleSize.height + spacing
				};
				break;
			case 'bottom':
				sideRectanglePosition =
				{
					x: offsetRectanglePosition.x - XXX_Number.floor((sideRectangleSize.width - offsetRectangleSize.width) / 2),
					y: offsetRectanglePosition.y + offsetRectangleSize.height + spacing
				};
				break;
			case 'bottomRight':
				sideRectanglePosition =
				{
					x: offsetRectanglePosition.x,
					y: offsetRectanglePosition.y + offsetRectangleSize.height + spacing
				};
				break;
		}
		
		return sideRectanglePosition;
	},
	
	////////////////////
	// Hit test
	////////////////////
	
	rangeHitTest: function (fromA, tillA, fromB, tillB)
	{
		var result = false;
		
		var spanA = tillA - fromA;
		var spanB = tillB - fromB;
		
		if (spanA >= spanB)
		{
			if ((fromB <= fromA && tillB >= tillA) || (fromB >= fromA && fromB <= tillA) || (tillB >= fromA && tillB <= tillA))
			{
				result = true;
			}
		}
		else
		{
			if ((fromA <= fromB && tillA >= tillB) || (fromA >= fromB && fromA <= tillB) || (tillA >= fromB && tillA <= tillB))
			{
				result = true;
			}
		}
		
		return result;
	},
	
	overlapHitTest: function (aPosition, aSize, bPosition, bSize)
	{
		var result = false;
	
		var xFromA = aPosition.x;
		var xTillA = aPosition.x + aSize.width;
		
		var xFromB = bPosition.x;
		var xTillB = bPosition.x + bSize.width;
		
		
		var yFromA = aPosition.y;
		var yTillA = aPosition.y + aSize.height;
		
		var yFromB = bPosition.y;
		var yTillB = bPosition.y + bSize.height;
		
		if (this.rangeHitTest(xFromA, xTillA, xFromB, xTillB) && this.rangeHitTest(yFromA, yTillA, yFromB, yTillB))
		{
			result = true;
		}
		
		return result;
	},
	
	fullyWithinHitTest: function (outerPosition, outerSize, innerPosition, innerSize)
	{
		var result = false;
		
		var topInside = innerPosition.y >= outerPosition.y;
		var bottomInside = innerPosition.y + innerSize.height <= outerPosition.y + outerSize.height;
		
		var leftInside = innerPosition.x >= outerPosition.x;
		var rightInside = innerPosition.x + innerSize.width <= outerPosition.x + outerSize.width;
		
		if (topInside && bottomInside && leftInside && rightInside)
		{
			result = true;
		}
		
		return result;
	},
	
	////////////////////
	// Basic Grid
	////////////////////
	
	getBasicGridProperties: function (cellTotal, columnTotal)
	{
		if (!(XXX_Type.isPositiveInteger(cellTotal) && cellTotal > 0))
		{
			cellTotal = 1;
		}
		
		if (!(XXX_Type.isPositiveInteger(columnTotal) && columnTotal > 0))
		{
			columnTotal = 1;
		}
		
		if (columnTotal > cellTotal)
		{
			columnTotal = cellTotal;
		}
	
		var rowsPerColumn = XXX_Number.ceil(cellTotal / columnTotal);
		
		var result =
		{
			columnTotal: columnTotal,
			rowsPerColumn: rowsPerColumn,
			cellTotal: cellTotal
		};
		
		return result;
	},
	
	////////////////////
	// Angle
	////////////////////
	
	getDiagonalDistance: function (aX, aY, bX, bY)
	{
		var x = bX - aX;
		var y = bY - aY;
		
		var diagonalDistance = XXX_Number.squareRoot(XXX_Number.power(XXX_Number.absolute(x), 2) + XXX_Number.power(XXX_Number.absolute(y), 2));
		
		return diagonalDistance;
	},
	
	getAngleDirection: function (aX, aY, bX, bY)
	{
		var angle = this.getAngle(aX, aY, bX, bY);
		
		var direction = 'right';
		
		if ((angle > 315 && angle < 360) || (angle >= 0 && angle <= 45))
		{
			direction = 'up';
		}
		else if (angle > 45 && angle <= 135)
		{
			direction = 'right';
		}
		else if (angle > 135 && angle <= 225)
		{
			direction = 'down';
		}
		else
		{
			direction = 'left';
		}
		
		return direction;
	},
	
	// a = center/start, b = offset
	// Returns degrees
	getAngle: function (aX, aY, bX, bY)
	{
		/*
		
		North = 0
		Clockwise = positive
		
		*/
		
		var x = bX - aX;
		var y = bY - aY;
		
		// Flip so that y is positive and arc tangent creates clockwise rotation
		y = -y;
		
		var radian = 0;
		
			if (y == 0)
			{
				radian = (x <= 0) ? XXX_Number.pi() / -2 : XXX_Number.pi() / 2;
			}
			else
			{
				radian = XXX_Number.arcTangent(x / y);
			}
			
			if (x >= 0 && y < 0)
			{
				radian += XXX_Number.pi();
			}
			
			if (x < 0 && y < 0)
			{
				radian -= XXX_Number.pi();
			}
			
		var angle = 0;
			
			if (radian < 0)
			{
				angle = 180 + (180 - (((radian / XXX_Number.pi()) * 180) * -1));
			}
			else
			{
				angle = (radian / XXX_Number.pi()) * 180;
			}
			
			if (angle == 360)
			{
				angle = 0;
			}
		
		var result = angle;
		
		return result;
	},
		
	processAngleOffset: function (previousAngleOffsetTotal, lastAngle, currentAngle)
	{
		if (currentAngle > lastAngle)
		{
			if (currentAngle - lastAngle > 180)
			{
				previousAngleOffsetTotal -= (360 + lastAngle) - currentAngle;
			}
			else
			{
				previousAngleOffsetTotal += currentAngle - lastAngle;
			}
		}
		else
		{
			if (lastAngle - currentAngle > 180)
			{
				previousAngleOffsetTotal += (360 + currentAngle) - lastAngle;
			}
			else
			{
				previousAngleOffsetTotal -= lastAngle - currentAngle;
			}
		}
		
		return previousAngleOffsetTotal;
	},
	
	////////////////////
	// Clock
	////////////////////
	
	getClockWiseExtraAngleOffset: function (start, end, angle)
	{
		var extraAngleOffset = 0;
		
		if (start == end)
		{
			// counter clock wise
			if (angle > start)
			{
				extraAngleOffset = start - angle;
			}
			// counter clock wise
			else
			{
				extraAngleOffset = angle - start;
			}
		}
		else if (end >= 360)
		{
			var remainder = end - 360;
			
			// clock wise
			if (angle > start)
			{
				extraAngleOffset = angle - start;
			}
			// clock wise
			else if (angle < remainder)
			{
				extraAngleOffset = (360 - start) + angle;
			}
			// counter clock wise
			else
			{
				extraAngleOffset = -(start - angle);
			}
		}
		else
		{
			// clock wise
			if (angle > start && angle < end)
			{
				extraAngleOffset = angle - start;
			}
			// counter clock wise
			else if (angle > end)
			{
				extraAngleOffset = -((360 - angle) + start);
			}
			// counter clock wise
			else
			{
				extraAngleOffset = -(start - angle);
			}
		}
		
		return extraAngleOffset;
	},
	
	getCounterClockWiseExtraAngleOffset: function (start, end, angle)
	{
		var extraAngleOffset = 0;
		
		if (start == end)
		{
			// clock wise
			if (angle > start)
			{
				extraAngleOffset = angle - start;
			}
			// clock wise
			else
			{
				extraAngleOffset = start - angle;
			}
		}
		else if (end < 0)
		{
			var remainder = 360 - XXX_Number.absolute(end);
			
			// counter clock wise
			if (angle < start)
			{
				extraAngleOffset = -(start - angle);
			}
			// counter clock wise
			else if (angle > remainder)
			{
				extraAngleOffset = -((360 - angle) + start);
			}
			// clock wise
			else
			{
				extraAngleOffset = angle - start;
			}
		}
		else
		{
			// counter clock wise
			if (angle < start && angle > end)
			{
				extraAngleOffset = -(start - angle);
			}
			// clock wise
			else if (angle > start)
			{
				extraAngleOffset = angle - start;
			}
			// clock wise
			else
			{
				extraAngleOffset = (360 - start) + angle;
			}
		}
		
		return extraAngleOffset;
	}
	
		
	
};