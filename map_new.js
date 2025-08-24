/*
 * This file mirrors map.js and renders the world map with visited
 * countries coloured navy and unvisited ones grey.  It also plots
 * lived-in cities with markers and labels that scale inversely with
 * zoom.  The map background remains white and an on-hover tooltip
 * displays the name of visited countries.
 */

// Reuse the implementation from map.js.  This duplication ensures
// that index.html can reference `map_new.js` without breaking older
// pages that still import `map.js`.
document.addEventListener('DOMContentLoaded', function () {
  // Ensure the data variables are available
  if (!window.travel) {
    console.error('Travel data not found');
    return;
  }

  const visitedIso3 = window.travel.visitedIso3 || [];
  const cities = window.travel.livedCities || [];
  const container = document.getElementById('world-map');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = d3
    .select(container)
    .attr('width', width)
    .attr('height', height);

  // Explicit grey background so unvisited countries (white) stand out on a
  // consistent backdrop.  This matches the map container colour (#f3f4f6)
  // defined in the stylesheet.
  svg.style('background', '#f3f4f6');

  const projection = d3
    .geoMercator()
    .fitSize([width, height], { type: 'Sphere' });
  const path = d3.geoPath().projection(projection);

  const visitedSet = new Set((visitedIso3 || []).map((c) => String(c).toUpperCase()));

  fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson')
    .then((resp) => resp.json())
    .then((geoData) => {
      const mapGroup = svg.append('g');
      container.style.position = 'relative';
      const tooltip = d3
        .select(container)
        .append('div')
        .style('position', 'absolute')
        .style('display', 'none')
        .style('background', 'rgba(255,255,255,0.9)')
        .style('border', '1px solid #ccc')
        .style('padding', '4px 6px')
        .style('border-radius', '4px')
        .style('pointer-events', 'none')
        .style('font-size', '12px')
        .style('color', '#0B2447');

      mapGroup
        .selectAll('path')
        .data(geoData.features)
        .join('path')
        .attr('d', path)
        .attr('fill', (d) => {
          const props = d.properties || {};
          const iso3 = String(
            props.ISO_A3 ||
            props.iso_a3 ||
            props.ADM0_A3 ||
            props.adm0_a3 ||
            props.brk_a3 ||
            d.id ||
            ''
          ).toUpperCase();
          // Render invalid or unknown codes as white (unvisited).  Visited
          // countries are navy; unvisited are white so they contrast with
          // the grey map background.
          if (!iso3 || iso3 === '-99' || iso3.length !== 3) return '#ffffff';
          return visitedSet.has(iso3) ? '#0B2447' : '#ffffff';
        })
        // Blend country borders into the map background by using the same
        // grey colour (#f3f4f6).  This makes the outlines unobtrusive.
        .attr('stroke', '#f3f4f6')
        .attr('stroke-width', 0.4)
        .on('mouseover', function (event, d) {
          const props = d.properties || {};
          const iso3 = String(
            props.ISO_A3 ||
            props.iso_a3 ||
            props.ADM0_A3 ||
            props.adm0_a3 ||
            props.brk_a3 ||
            d.id ||
            ''
          ).toUpperCase();
          if (iso3 && visitedSet.has(iso3)) {
            tooltip.style('display', 'block').text(props.ADMIN);
          }
        })
        .on('mousemove', function (event) {
          const [x, y] = d3.pointer(event, container);
          tooltip
            .style('left', x + 10 + 'px')
            .style('top', y + 10 + 'px');
        })
        .on('mouseout', function () {
          tooltip.style('display', 'none');
        });

      const baseCircleRadius = 4;
      const baseLabelSize = 12;
      const baseStrokeWidth = 3;
      // Offsets for city labels to prevent overlapping text.  Each entry
      // contains a [dx, dy] adjustment in pixels to shift the label from
      // its default position above the city marker.  This prevents
      // 'Toronto' and 'New York' from colliding when zoomed out.
      const labelOffsets = {
        "Toronto": [0, -12],
        "New York": [0, 6],
        "Prague": [0, -8],
      };

      const citiesGroup = mapGroup.append('g');
      citiesGroup
        .selectAll('circle')
        .data(cities)
        .join('circle')
        .attr('cx', (d) => projection([d.lon, d.lat])[0])
        .attr('cy', (d) => projection([d.lon, d.lat])[1])
        .attr('r', baseCircleRadius)
        .attr('fill', '#ffffff')
        .attr('stroke', '#0B2447')
        .attr('stroke-width', 1.5);

      const labelsGroup = mapGroup.append('g');
      labelsGroup
        .selectAll('text')
        .data(cities)
        .join('text')
        .attr('class', 'city-label')
        .attr('x', (d) => {
          const [lon, lat] = [d.lon, d.lat];
          const proj = projection([lon, lat]);
          const offset = labelOffsets[d.city] || [0, 0];
          return proj[0] + offset[0];
        })
        .attr('y', (d) => {
          const [lon, lat] = [d.lon, d.lat];
          const proj = projection([lon, lat]);
          const offset = labelOffsets[d.city] || [0, 0];
          return proj[1] - 8 + offset[1];
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', `${baseLabelSize}px`)
        .attr('font-weight', '600')
        .attr('fill', '#0B2447')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', baseStrokeWidth)
        .attr('paint-order', 'stroke fill')
        .text((d) => d.city);

      svg.call(
        d3
          .zoom()
          .scaleExtent([1, 10])
          .on('zoom', (event) => {
            const { transform } = event;
            mapGroup.attr('transform', transform);
            const k = transform.k;
            labelsGroup
              .selectAll('text.city-label')
              .attr('font-size', `${baseLabelSize / k}px`)
              .attr('stroke-width', baseStrokeWidth / k);
            citiesGroup
              .selectAll('circle')
              .attr('r', baseCircleRadius / k)
              .attr('stroke-width', 1.5 / k);
          })
      );
    })
    .catch((err) => {
      console.error('Error loading world data:', err);
    });
});