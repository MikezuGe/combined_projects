#if defined (VERTEX)
  in vec3 a_position;
  in vec2 a_texcoord;
  in vec3 a_normal;
  in vec3 a_tangent;
  in vec3 a_bitangent;

  uniform mat4 u_mvp;
  uniform mat4 u_model;
  uniform mat3 u_model_rotation;
  uniform mat4 u_view;
  uniform mat4 u_perspectice;
  uniform mat4 u_view_inverted;
  uniform mat3 u_normal_matrix;
  uniform float u_time;

  out float time;
  out vec3 fragPosition;
  out vec2 fragTexcoord;
  out vec3 fragNormal;
  out vec3 cameraPosition;
  out vec3 lightPosition;
  out mat3 tbn;
  out vec3 dummy;

  void main () {
    time = u_time;

    #if defined (COLORMAP) || defined (DIFFUSEMAP) || defined (SPECULARMAP)
      fragTexcoord = a_texcoord;
    #else
      dummy = vec3(a_texcoord, 0.0);
    #endif

    #if defined (DIFFUSE) || defined (DIFFUSEMAP) || defined (SPECULAR) || defined (SPECULARMAP)
      fragPosition = vec3(u_model * vec4(a_position, 1.0));
      fragNormal = u_normal_matrix * a_normal;
      lightPosition = vec3(cos(time * 0.001) * 10.0, 0.0, sin(time * 0.001) * 10.0 - 10.0);
    #endif

    #if defined (SPECULAR) || defined (SPECULARMAP)
      cameraPosition = u_view[3].xyz;
    #endif

    #if defined (NORMALMAP)
      tbn = transpose(mat3(u_normal_matrix * a_tangent, u_normal_matrix * a_bitangent, u_normal_matrix * a_normal));
    #else
      dummy = a_tangent * a_bitangent;
    #endif

    gl_Position = u_mvp * vec4(a_position, 1.0);
  }
#endif


#if defined (FRAGMENT)
  precision mediump float;

  #define PI = 3.14159265

  in float time;
  in vec3 fragPosition;
  in vec2 fragTexcoord;
  in vec3 fragNormal;
  in vec3 cameraPosition;
  in vec3 lightPosition;
  in mat3 tbn;

  uniform sampler2D u_colortexture;
  uniform sampler2D u_normaltexture;
  uniform sampler2D u_speculartexture;

  out vec4 outColor;

  #if defined (DIFFUSE) || defined (DIFFUSEMAP) || defined (SPECULAR) || defined (SPECULARMAP)

    vec3 calculateLight () {
      #if defined (NORMALMAP)
        vec3 normal = normalize(texture2D(u_normaltexture, fragTexcoord).rgb * 2.0 - 1.0);
      #else
        vec3 normal = normalize(fragNormal);
      #endif
      vec3 lightColor = vec3(1.0, 1.0, 1.0); // Get from uniform
      vec3 fragToLight = normalize(lightPosition - fragPosition);

      vec3 totalLight = vec3(0.0, 0.0, 0.0);
      
      #if defined (DIFFUSE) || defined (DIFFUSEMAP)
        #if defined (DIFFUSEMAP)
        #endif
        float diffuseStrength = 0.5; // Get from uniform
        float diffuse = max(dot(normal, fragToLight), 0.0);
        totalLight += (lightColor * diffuse * diffuseStrength);
      #endif

      #if defined (SPECULAR) || defined (SPECULARMAP)
        #if defined (SPECULARMAP)
        #endif
        float specularStrength = 0.5; // Get from uniform
        float specularShininess = 16.0; // Get from uniform
        vec3 fragToCamera = normalize(cameraPosition - fragPosition);
        vec3 halfVector = normalize(fragToLight + fragToCamera);
        float specular = pow(max(dot(normal, halfVector), 0.0), specularShininess);
        totalLight += (lightColor * specular * specularStrength);
      #endif

      return totalLight;
    }
    
  #endif

  void main () {
    vec3 finalColor = vec3(1.0, 0.64, 0.0); // Orange, but looks golden
    #if defined (COLORMAP)
      finalColor = texture(u_colortexture, fragTexcoord).rgb;
    #endif
    #if defined (DIFFUSE) || defined (DIFFUSEMAP) || defined (SPECULAR) || defined (SPECULARMAP)
      finalColor *= calculateLight();
    #endif
    outColor = vec4(finalColor, 1.0);
  }
#endif
