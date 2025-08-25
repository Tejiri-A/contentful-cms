import { createClient } from "contentful";
import { useEffect, useState } from "react";

/**
 * The `client` variable is an instance of the Contentful client created to interact with the Contentful Content Delivery API.
 * It is configured with a specific space ID, environment, and an access token for authentication.
 *
 * @type {Object}
 * @property {string} space The unique identifier for the Contentful space.
 * @property {string} environment The environment in the Contentful space to fetch data from.
 * @property {string} accessToken The API key used to authenticate requests to the Contentful API.
 */
const client = createClient({
  space: "1pclog11qkc4",
  environment: "master",
  accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY,
});

/**
 * A custom React hook to fetch and manage project data from an external content management system.
 *
 * @function useFetchProjects
 * @returns {Object} An object containing:
 * - `loading` (boolean): Indicates the loading state of the data fetch operation.
 * - `projects` (Array): A list of project objects with the following properties:
 *   - `id` (string): Unique identifier for the project.
 *   - `title` (string): Title of the project.
 *   - `projectUrl` (string): URL associated with the project.
 *   - `imageUrl` (string): URL of the project's image.
 *
 * @description This hook fetches data from a Contentful content type called "projects", parses relevant project fields,
 * handles errors, and manages the loading state. The project data is structured and stored in a state for use in components.
 */
export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: "projects" });

      const projects = response.items.map((project) => {
        const { id } = project.sys;
        const {
          title,
          url: projectUrl,
          image: {
            fields: {
              file: { url: imageUrl },
            },
          },
        } = project.fields;
        return { id, title, projectUrl, imageUrl };
      });
      setProjects(projects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { loading, projects };
};
