/*
 * World map renderer.
 *
 * Uses D3 and TopoJSON to draw a simplified world map with
 * countries coloured according to whether they appear in the
 * `travel.visitedIso3` list.  Cities you have lived in are plotted
 * as small white dots with labels.  The map automatically scales to
 * the size of its container.
 */

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

  // Define projection and path.  We use fitSize on the sphere for
  // convenience – this scales the projection to fill the SVG.
  const projection = d3
    .geoMercator()
    .fitSize([width, height], { type: 'Sphere' });
  const path = d3.geoPath().projection(projection);

  // Build a set of visited ISO3 codes for fast lookup
  const visitedSet = new Set(visitedIso3.map((c) => String(c).toUpperCase()));

  // Helper to extract an ISO3 code from a country feature
  function getIso3(f) {
    const props = f.properties || {};
    const iso =
      props.ISO_A3 ||
      props.iso_a3 ||
      props.ADM0_A3 ||
      props.adm0_a3 ||
      props.brk_a3 ||
      f.id ||
      '';
    return String(iso).toUpperCase();
  }

  // Fetch country boundaries and draw the map
  fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson')
    .then((resp) => resp.json())
    .then((geoData) => {
      // Create a group to hold the map so zoom transforms apply to all elements
      const mapGroup = svg.append('g');

      // Draw country shapes
      mapGroup
        .selectAll('path')
        .data(geoData.features)
        .join('path')
        .attr('d', path)
        .attr('fill', (d) => {
          const iso3 = getIso3(d);
          if (!iso3 || iso3 === '-99' || iso3.length !== 3) return '#D1D5DB';
          return visitedSet.has(iso3) ? '#0B2447' : '#D1D5DB';
        })
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 0.4)
        .each(function (d) {
          const iso3 = getIso3(d);
          if (iso3 && visitedSet.has(iso3)) {
            // Append a <title> element so the country name appears on hover
            d3.select(this).append('title').text(d.properties && d.properties.ADMIN);
          }
        });

      // Plot lived-in cities as white dots with navy border
      mapGroup
        .append('g')
        .selectAll('circle')
        .data(cities)
   
        .join('circle')
        .attr('cx', (d) => projection([d.lon, d.lat])[0])
        .attr('cy', (d) => projection([d.lon, d.lat])[1])
        .attr('r', 4)
        .attr('fill', '#ffffff')
        .attr('stroke', '#0B2447')
        .attr('stroke-width', 1.5);

      // Add labels above each city dot
      mapGroup
        .append('g')
        .selectAll('text')
        .data(cities)
        .join('text')
        .attr('x', (d) => projection([d.lon, d.lat])[0])
        .attr('y', (d) => projection([d.lon, d.lat])[1] - 8)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', '600')
        .attr('fill', '#374151')
        .text((d) => d.city);

      // Enable zooming and panning. The scaleExtent restricts how far you can
      // zoom in or out. During zoom events the transform is applied to mapGroup.
      svg.call(
        d3
          .zoom()
          .scaleExtent([1, 10])
          .on('zoom', (event) => {
            mapGroup.attr('transform', event.transform);
          })
      );
    })
    .catch((err) => {
      console.error('Error loading world data:', err);
    });
  
});
